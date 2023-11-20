import { Comment } from "@/db/models/Comment/model/Comment";
import { ModelController } from "@/libraries/ModelController";
import { validateBody } from "@/libraries/Validator";
import { stripNestedObjects } from "@/policies/General";
import { CommentSchema, UpdateCommentSchema } from "@/validators/Comment";
import { Router } from "express";

export class CommentController extends ModelController<Comment> {
  constructor() {
    super();
    this.name = "comment";
    this.model = Comment;
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Comment
     *     description: Comments for lessons
     */

    /**
     * @swagger
     * components:
     *   requestBodies:
     *     NewComment:
     *       required: true
     *       description: Comment data
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewComment'
     *     EditComment:
     *       required: true
     *       description: Comment data
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditComment'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewComment:
     *       type: object
     *       properties:
     *         comment:
     *           type: string
     *           description: The content of the comment.
     *         date:
     *           type: string
     *           format: date
     *           description: The date when the comment was made. Default is the current date.
     *         userId:
     *           type: integer
     *           description: The ID of the user who made the comment.
     *           example: 1
     *         lessonId:
     *           type: integer
     *           description: The ID of the lesson to which the comment is related.
     *           example: 1
     *       required:
     *         - comment
     *         - userId
     *         - lessonId
     *
     *     EditComment:
     *       type: object
     *       properties:
     *         comment:
     *           type: string
     *           description: The content of the comment.
     *           example: string 2
     *         date:
     *           type: string
     *           format: date
     *           example: 01-01-2024
     */

    /**
     * @swagger
     * '/comment':
     *   get:
     *     tags:
     *       - Comment
     *     summary: Get all comment entries
     *     operationId: GetAllComments
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
     *                         $ref: '#/components/schemas/NewComment'
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
     * '/comment/{id}':
     *   get:
     *     tags:
     *       - Comment
     *     summary: Get a comment entry by id
     *     operationId: FindCommentById
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
     *                       $ref: '#/components/schemas/NewComment'
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
     * '/comment':
     *   post:
     *     tags:
     *       - Comment
     *     summary: Create a Comment entry
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
     *                       $ref: '#/components/schemas/Comment'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/NewComment'
     */
    this.router.post(
      "/",
      //validateJWT("access"),
      stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      validateBody(CommentSchema),
      (req, res) => this.handleCreate(req, res),
    );
    /**
     * @swagger
     * '/comment/{id}':
     *   patch:
     *     tags:
     *       - Comment
     *     summary: Update Comment by id
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
     *                       $ref: '#/components/schemas/Comment'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/EditComment'
     */
    this.router.patch(
      "/:id",
      //validateJWT("access"),
      stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      validateBody(UpdateCommentSchema),
      (req, res) => this.handleUpdate(req, res),
    );
    /**
     * @swagger
     * '/comment/{id}':
     *   delete:
     *     tags:
     *       - Comment
     *     summary: Delete a comment entry by id
     *     operationId: DeleteCommentById
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
      //}filterOwner(),
      (req, res) => this.handleDelete(req, res),
    );

    return this.router;
  }
}

const comment = new CommentController();
export default comment;
