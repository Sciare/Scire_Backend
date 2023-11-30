import { QuizQuestion } from "@/db/models/QuizQuestion/model/QuizQuestion";
import { ModelController } from "@/libraries/ModelController";
import { Router } from "express";

export class QuizQuestionController extends ModelController<QuizQuestion> {
  constructor() {
    super();
    this.name = "quizquestion";
    this.model = QuizQuestion;
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: QuizQuestion
     *     description: Operations related to quiz questions
     */

    /**
     * @swagger
     * components:
     *   requestBodies:
     *     NewQuizQuestion:
     *       required: true
     *       description: Data for a new quiz question
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewQuizQuestion'
     *     EditQuizQuestion:
     *       required: true
     *       description: Data to update a quiz question
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditQuizQuestion'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewQuizQuestion:
     *       type: object
     *       properties:
     *         quizId:
     *           type: integer
     *           description: The ID of the quiz to which this question belongs.
     *           example: 1
     *         question:
     *           type: string
     *           description: The text of the quiz question.
     *           example: "What is the capital of France?"
     *         answers:
     *           type: array
     *           description: Array containing possible answers.
     *           items:
     *             type: string
     *           example: ["Paris", "Rome", "Madrid"]
     *         correct_answers:
     *           type: json
     *           description: JSON object specifying the correct answer(s).
     *           example: "Paris"
     *       required:
     *         - quizId
     *         - question
     *         - answers
     *         - correct_answers
     *
     *     EditQuizQuestion:
     *       type: object
     *       properties:
     *         quizId:
     *           type: integer
     *           description: The ID of the quiz to which this question belongs.
     *           example: 1
     *         question:
     *           type: string
     *           description: The updated text of the quiz question.
     *           example: "What is the capital of Italy?"
     *         answers:
     *           type: array
     *           description: Array containing updated possible answers.
     *           items:
     *             type: string
     *           example: ["Paris", "Rome", "Madrid"]
     *         correct_answers:
     *           type: json
     *           description: Updated JSON object specifying the correct answer(s).
     *           example:  "Rome"
     */

    /**
     * @swagger
     * '/quizquestion':
     *   get:
     *     tags:
     *       - QuizQuestion
     *     summary: Get all quiz questions
     *     operationId: GetAllQuizQuestions
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
     *                       $ref: '#/components/schemas/NewQuizQuestion'
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
     * '/quizquestion/{id}':
     *   get:
     *     tags:
     *       - QuizQuestion
     *     summary: Get a specific quiz question by ID
     *     operationId: GetQuizQuestionById
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *       - $ref: '#/components/parameters/include'
     *       - $ref: '#/components/parameters/attributes'
     *     responses:
     *       '200':
     *         description: A single quiz question.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/NewQuizQuestion'
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
     * '/quizquestion':
     *   post:
     *     tags:
     *       - QuizQuestion
     *     summary: Create a new quiz question
     *     operationId: CreateQuizQuestion
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       $ref: '#/components/requestBodies/NewQuizQuestion'
     *     responses:
     *       '201':
     *         description: New quiz question created.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/NewQuizQuestion'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
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
     * '/quizquestion/{id}':
     *   put:
     *     tags:
     *       - QuizQuestion
     *     summary: Update a quiz question by ID
     *     operationId: UpdateQuizQuestion
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *     requestBody:
     *       $ref: '#/components/requestBodies/EditQuizQuestion'
     *     responses:
     *       '200':
     *         description: Quiz question updated.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/EditQuizQuestion'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
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
     * '/quizquestion/{id}':
     *   delete:
     *     tags:
     *       - QuizQuestion
     *     summary: Delete a quiz question by ID
     *     operationId: DeleteQuizQuestion
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Numeric ID of the quiz question to delete
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: Quiz question deleted.
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

const quizquestion = new QuizQuestionController();
export default quizquestion;
