import { Enrollment } from "@/db/models/Enrollment/model/Enrollment";
import { ModelController } from "@/libraries/ModelController";
import { validateBody } from "@/libraries/Validator";
import { dontRepeatEnrollment } from "@/policies/General";
import {
  EnrollmentSchema,
  UpdateEnrollmentSchema,
} from "@/validators/Enrollment";
import { Router } from "express";

export class EnrollmentController extends ModelController<Enrollment> {
  constructor() {
    super();
    this.name = "enrollment";
    this.model = Enrollment;
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Enrollment
     *     description: Operations related to enrollment
     */

    /**
     * @swagger
     * components:
     *   requestBodies:
     *     NewEnrollment:
     *       required: true
     *       description: Enrollment data
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewEnrollment'
     *     EditEnrollment:
     *       required: true
     *       description: Enrollment data for update
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditEnrollment'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewEnrollment:
     *       type: object
     *       properties:
     *         userId:
     *           type: integer
     *           description: The ID of the user enrolling in the Course.
     *         courseId:
     *           type: integer
     *           description: The ID of the courseId in which the user is enrolling.
     *         enrollment_date:
     *           type: string
     *           format: date
     *           description: The date of enrollment. Defaults to the current date.
     *         is_started:
     *           type: boolean
     *           description: Indicates if the user has started the enrollment.
     *           default: false
     *         is_active:
     *           type: boolean
     *           description: Indicates if the enrollment is active.
     *           default: true
     *       required:
     *         - userId
     *         - courseId
     *
     *     EditEnrollment:
     *       type: object
     *       properties:
     *         is_started:
     *           type: boolean
     *           description: Indicates if the user has started the enrollment.
     *         is_active:
     *           type: boolean
     *           description: Indicates if the enrollment is active.
     */

    /**
     * @swagger
     * '/enrollment':
     *   get:
     *     tags:
     *       - Enrollment
     *     summary: Get all enrollment entries
     *     operationId: GetAllEnrollments
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/limit'
     *       - $ref: '#/components/parameters/offset'
     *       - $ref: '#/components/parameters/order'
     *       - $ref: '#/components/parameters/include'
     *       - $ref: '#/components/parameters/where'
     *       - $ref: '#/components/parameters/attributes'
     *     responses:
     *       '200':
     *         description: The request has succeeded.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/SuccessfulResponse'
     *                 - type: object
     *                   properties:
     *                     count:
     *                       type: number
     *                       example: 1
     *                     limit:
     *                       type: number
     *                       example: 99
     *                     offset:
     *                       type: number
     *                       example: 0
     *                     data:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/NewEnrollment'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */

    this.router.get(
      "/",
      //validateJWT("access"),
      //filterOwner(),
      (req, res) => this.handleFindAll(req, res),
    );
    /**
     * @swagger
     * '/enrollment/{id}':
     *   get:
     *     tags:
     *       - Enrollment
     *     summary: Get a enrollment entry by id
     *     operationId: FindEnrollmentById
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *       - $ref: '#/components/parameters/include'
     *       - $ref: '#/components/parameters/attributes'
     *     responses:
     *       '200':
     *         description: The request has succeeded.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/SuccessfulResponse'
     *                 - type: object
     *                   properties:
     *                     data:
     *                       $ref: '#/components/schemas/NewEnrollment'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.get(
      "/:id",
      //validateJWT("access"),
      //filterOwner(),
      (req, res) => this.handleFindOne(req, res),
    );
    /**
     * @swagger
     * '/enrollment':
     *   post:
     *     tags:
     *       - Enrollment
     *     summary: Create a Enrollment entry
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '201':
     *         description: The request has succeeded.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/CreatedResponse'
     *                 - type: object
     *                   properties:
     *                     data:
     *                       $ref: '#/components/schemas/Enrollment'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/NewEnrollment'
     */
    this.router.post(
      "/",
      //validateJWT("access"),
      //filterOwner(),
      //appendUser(),
      dontRepeatEnrollment(),
      validateBody(EnrollmentSchema),
      (req, res) => this.handleCreate(req, res),
    );
    /**
     * @swagger
     * '/enrollment/{id}':
     *   patch:
     *     tags:
     *       - Enrollment
     *     summary: Update Enrollment by id
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *     responses:
     *       '200':
     *         description: The request has succeeded.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/CreatedResponse'
     *                 - type: object
     *                   properties:
     *                     data:
     *                       $ref: '#/components/schemas/Enrollment'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/EditEnrollment'
     */
    this.router.patch(
      "/:id",
      //validateJWT("access"),
      //filterOwner(),
      //appendUser(),
      validateBody(UpdateEnrollmentSchema),
      (req, res) => this.handleUpdate(req, res),
    );
    /**
     * @swagger
     * '/enrollment/{id}':
     *   delete:
     *     tags:
     *       - Enrollment
     *     summary: Delete a enrollment entry by id
     *     operationId: DeleteEnrollmentById
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *     responses:
     *       '200':
     *         $ref: '#/components/responses/OK'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *
     */
    this.router.delete(
      "/:id",
      //validateJWT("access"),
      //filterOwner(),
      (req, res) => this.handleDelete(req, res),
    );

    return this.router;
  }
}

const enrollment = new EnrollmentController();
export default enrollment;
