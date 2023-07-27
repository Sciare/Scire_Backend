import { config } from "@/config";
import { Profile } from "@/db/models/Profile/model/Profile";
import { Role } from "@/db/models/Role/model/Role";
import { User } from "@/db/models/User/model/User";
import { AuthType } from "@/db/models/User/types/AuthType";
import { InvalidMicrosoftAccount } from "@/errors/azure/InvalidMicrosoftAccount";
import { MailNotFound } from "@/errors/emailauth/MailNotFound";
import { UnauthorizedUser } from "@/errors/user/UnauthorizedUser";
import { Controller } from "@/libraries/Controller";
import {
  IdentityProvider,
  authenticateSSO,
  authenticateSSOCallback,
} from "@/policies/Authentication";
import authService from "@/services/AuthService";
import { createUserFromAzure } from "@/services/AzureUserService";
import { addDefaultRoleToUser } from "@/services/RoleService";
import { Request, Response, Router } from "express";

interface LoginOptions {
  loginPageRedirect: string;
  homePageRedirect: string;
}

export class MicrosoftAuthController extends Controller {
  constructor() {
    super();
    this.name = "microsoftauth";
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Microsoft Auth
     *     description: Microsoft SSO Service
     */

    /**
     * @swagger
     * /microsoftauth/login:
     *   get:
     *     tags:
     *       - Microsoft Auth
     *     summary: Microsoft Auth
     *     description: Return to redirect microsoft web login.
     *     operationId: MicrosoftLogin
     *     responses:
     *       '201':
     *         description: The request has succeeded and the user will redirect to microsoft login.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/SuccessfulResponse'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.get("/login", authenticateSSO(IdentityProvider.Microsoft));

    /**
     * @swagger
     * /microsoftauth/login/callback:
     *   get:
     *     tags:
     *       - Microsoft Auth
     *     summary: Microsoft callback
     *     description: Return the redirect to home page with user token.
     *     operationId: MicrosoftCallback
     *     responses:
     *       '201':
     *         description: The request has succeeded and the user will redirect to home login.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/SuccessfulResponse'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.get(
      "/login/callback",
      authenticateSSOCallback(IdentityProvider.Microsoft),
      (req, res) => {
        console.log("gol");
        const loginOptions: LoginOptions = {
          loginPageRedirect: config.auth.routes.login_page,
          homePageRedirect: config.auth.routes.home_page,
        };

        return this.login(req, res, loginOptions);
      },
    );

    return this.router;
  }

  /*
    Because we are using SSO with the company's active directory, we don't need to register a user previously,
    we can just trust that it is a valid user if it was successfully authenticated by Azure AD.
    So, if the user was not previously registered in this system, we are registering it here.
  */
  async login(req: Request, res: Response, options: LoginOptions) {
    try {
      // On Microsoft, it is called mail. On Gmail, it is called email.
      const email =
        (req as Request & { user?: any }).user?._json?.mail ||
        (req as Request & { user?: any }).user?._json?.email;
      const id = (req as Request & { user?: any }).user?._json?.id;
      const userPrincipalName = (req as Request & { user?: any }).user?._json
        ?.userPrincipalName;

      if (!email) {
        return Controller.notFound(res);
      }

      const lowerCaseEmail = email.toLowerCase();

      let user: User = await User.findOne({
        where: {
          email: lowerCaseEmail,
        },
        include: [
          { model: Profile, as: "profile" },
          { model: Role, as: "roles" },
        ],
      });

      if (!user) {
        // If it is the first time this user logs in, create new user from SSO response data
        user = await createUserFromAzure({
          msId: id || userPrincipalName || email,
          email: lowerCaseEmail,
        });
        // We need to do another query because before, the profile and role weren't ready
        user = await User.findOne({
          where: { id: user.id },
          include: [
            { model: Profile, as: "profile" },
            { model: Role, as: "roles" },
          ],
        });
      }

      if (user?.authType !== AuthType.Microsoft) {
        throw new MailNotFound();
      }

      if (!user.isActive) {
        throw new UnauthorizedUser();
      }

      await addDefaultRoleToUser(user.id);
      const token = authService.getExchangeToken(user);
      res.redirect(`${options.homePageRedirect}?token=${token}`);
    } catch (error) {
      if (error instanceof MailNotFound) {
        return Controller.notFound(res, error.message);
      }

      if (error instanceof InvalidMicrosoftAccount) {
        return Controller.badRequest(res, error.message);
      }

      if (error instanceof UnauthorizedUser) {
        return res.redirect(`${options.loginPageRedirect}?status=unauthorized`);
      }

      return Controller.serverError(res, error);
    }
  }
}

const controller = new MicrosoftAuthController();
export default controller;
