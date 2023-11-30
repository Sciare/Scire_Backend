import { Attempt } from "@/db/models/Attempt/model/Attempt";
import { ModelController } from "@/libraries/ModelController";
import { Router } from "express";

export class AttemptController extends ModelController<Attempt> {
  constructor() {
    super();
    this.name = "attempt";
    this.model = Attempt;
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Attempt
     *     description: Operations related to quiz attempt
     */

    /**
     * @swagger
     * components:
     *   requestBodies:
     *     NewAttempt:
     *       required: true
     *       description: Data for a new quiz attempt
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewAttempt'
     *     EditAttempt:
     *       required: true
     *       description: Data to update a quiz attempt
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditAttempt'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewAttempt:
     *       type: object
     *       properties:
     *         quizId:
     *           type: integer
     *           description: The ID of the quiz being attempted.
     *           example: 1
     *         userId:
     *           type: integer
     *           description: The ID of the user attempting the quiz.
     *           example: 1
     *         answers:
     *           type: object
     *           description: JSON object storing the user's answers.
     *           example: { "¿Cuál es la capital de Francia?": "paris", "¿Cuál es la capital de Rusia?": "madrid", "¿Cuál es la capital de Mexico?": "Mexico"}
     *         startTime:
     *           type: string
     *           format: date-time
     *           description: The start time of the attempt.
     *         endTime:
     *           type: string
     *           format: date-time
     *           description: The end time of the attempt.
     *         score:
     *           type: integer
     *           description: The score obtained in the quiz attempt.
     *           example: 80
     *         passed:
     *           type: boolean
     *           description: Indicates whether the quiz was passed.
     *           example: true
     *       required:
     *         - quizId
     *         - userId
     *         - answers
     *         - startTime
     *         - endTime
     *         - score
     *         - passed
     *
     *     EditAttempt:
     *       type: object
     *       properties:
     *         quizId:
     *           type: integer
     *           description: The ID of the quiz being attempted.
     *           example: 1
     *         userId:
     *           type: integer
     *           description: The ID of the user attempting the quiz.
     *           example: 1
     *         answers:
     *           type: object
     *           description: Updated JSON object storing the user's answers.
     *           example: { "¿Cuál es la capital de Francia?": "paris", "¿Cuál es la capital de Rusia?": "madrid", "¿Cuál es la capital de Mexico?": "Mexico"}
     *         startTime:
     *           type: string
     *           format: date-time
     *           description: The updated start time of the attempt.
     *         endTime:
     *           type: string
     *           format: date-time
     *           description: The updated end time of the attempt.
     *         score:
     *           type: integer
     *           description: The updated score obtained in the attempt.
     *           example: 60
     *         passed:
     *           type: boolean
     *           description: Updated indication of whether the quiz was passed.
     *           example: false
     */

    /**
     * @swagger
     * '/attempt':
     *   get:
     *     tags:
     *       - Attempt
     *     summary: Get all attempt entries
     *     operationId: GetAllAttemptes
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
     *                     data:
     *                       $ref: '#/components/schemas/NewAttempt'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */
    this.router.get(
      "/",
      //validateJWT("access"), filterOwner(),
      (req, res) => this.handleFindAll(req, res),
    );

    /**
     * @swagger
     * '/attempt/{id}':
     *   get:
     *     tags:
     *       - Attempt
     *     summary: Get a attempt by ID
     *     operationId: GetAttemptById
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *       - $ref: '#/components/parameters/include'
     *       - $ref: '#/components/parameters/attributes'
     *     responses:
     *       '200':
     *         description: A single attempt.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Attempt'
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
      //validateJWT("access"), filterOwner(),
      (req, res) => this.handleFindOne(req, res),
    );

    /**
     * @swagger
     * '/attempt':
     *   post:
     *     tags:
     *       - Attempt
     *     summary: Create a new Attempt
     *     operationId: CreateAttempt
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       description: Attempt data
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewAttempt'
     *     responses:
     *       '201':
     *         description: A new attempt has been created.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Attempt'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */

    this.router.post(
      "/",
      //validateJWT("access"),
      //stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      (req, res) => this.handleCreate(req, res),
    );

    /**
     * @swagger
     * '/attempt/{id}':
     *   put:
     *     tags:
     *       - Attempt
     *     summary: Update a attempt by ID
     *     operationId: UpdateAttempt
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *     requestBody:
     *       description: attempt data to update
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditAttempt'
     *     responses:
     *       '200':
     *         description: The attempt has been updated.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Attempt'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */

    this.router.put(
      "/:id",
      //validateJWT("access"),
      //stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      (req, res) => this.handleUpdate(req, res),
    );

    /**
     * @swagger
     * '/attempt/{id}':
     *   delete:
     *     tags:
     *       - Attempt
     *     summary: Delete a attempt by ID
     *     operationId: DeleteAttempt
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Numeric ID of the attempt to delete
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: The attempt has been deleted.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessfulResponse'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
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

const attempt = new AttemptController();
export default attempt;
