import { Quiz } from "@/db/models/Quiz/model/Quiz";
import { QuizQuestion } from "@/db/models/QuizQuestion/model/QuizQuestion";
import {
  Controller,
  handleServerError,
  parseBody,
  parseId,
} from "@/libraries/Controller";
import { ModelController } from "@/libraries/ModelController";
import { Request, Response, Router } from "express";

export class QuizController extends ModelController<Quiz> {
  constructor() {
    super();
    this.name = "quiz";
    this.model = Quiz;
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Quiz
     *     description: Quiz operations
     */

    /**
     * @swagger
     * components:
     *   requestBodies:
     *     NewQuiz:
     *       required: true
     *       description: Data for a new quiz
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewQuiz'
     *     NewQuizBulk:
     *       required: true
     *       description: Data for a new quiz with Q&A
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewQuizBulk'
     *     EditQuiz:
     *       required: true
     *       description: Data to update a quiz
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditQuiz'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewQuiz:
     *       type: object
     *       properties:
     *         courseId:
     *           type: integer
     *           description: The ID of the course to which the quiz belongs.
     *           example: 1
     *         duration:
     *           type: integer
     *           description: Duration of the quiz in minutes.
     *           example: 60
     *         passingScore:
     *           type: integer
     *           description: The score required to pass the quiz.
     *           example: 70
     *       required:
     *         - courseId
     *         - duration
     *         - passingScore
     *
     *     NewQuizBulk:
     *       type: object
     *       properties:
     *         courseId:
     *           type: integer
     *           description: The ID of the course to which the quiz belongs.
     *           example: 1
     *         duration:
     *           type: integer
     *           description: Duration of the quiz in minutes.
     *           example: 60
     *         passingScore:
     *           type: integer
     *           description: The score required to pass the quiz.
     *           example: 70
     *         questions:
     *           type: array
     *           description: Array of questions for the quiz.
     *           items:
     *             type: object
     *             properties:
     *               question:
     *                 type: string
     *                 description: The quiz question.
     *                 example: "What is the capital of France?"
     *               answers:
     *                 type: array
     *                 description: List of possible answers.
     *                 items:
     *                   type: string
     *                 example: ["Paris", "Rome", "Madrid"]
     *               correct_answers:
     *                 type: string
     *                 description: The correct answer to the question.
     *                 example: "Paris"
     *       required:
     *         - courseId
     *         - duration
     *         - passingScore
     *         - questions
     *     EditQuiz:
     *       type: object
     *       properties:
     *         courseId:
     *           type: integer
     *           description: The ID of the course to which the quiz belongs.
     *           example: 1
     *         duration:
     *           type: integer
     *           description: Duration of the quiz in minutes.
     *           example: 60
     *         passingScore:
     *           type: integer
     *           description: The score required to pass the quiz.
     *           example: 70
     */

    /**
     * @swagger
     * '/quiz':
     *   get:
     *     tags:
     *       - Quiz
     *     summary: Get all quiz entries
     *     operationId: GetAllQuizzes
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
     *                       $ref: '#/components/schemas/NewQuiz'
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
      (req, res) => this.handleFindAll(req, res),
    );

    /**
     * @swagger
     * '/quiz/{id}':
     *   get:
     *     tags:
     *       - Quiz
     *     summary: Get a quiz by ID
     *     operationId: GetQuizById
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *       - $ref: '#/components/parameters/include'
     *       - $ref: '#/components/parameters/attributes'
     *     responses:
     *       '200':
     *         description: A single quiz.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Quiz'
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
      (req, res) => this.handleFindOne(req, res),
    );

    /**
     * @swagger
     * '/quiz':
     *   post:
     *     tags:
     *       - Quiz
     *     summary: Create a new quiz
     *     operationId: CreateQuiz
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       description: Quiz data
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewQuiz'
     *     responses:
     *       '201':
     *         description: A new quiz has been created.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Quiz'
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
      (req, res) => this.handleCreate(req, res),
    );

    /**
     * @swagger
     * '/quiz/bulk':
     *   post:
     *     tags:
     *       - Quiz
     *     summary: Create a new quiz with a bulk crate for Q&A
     *     operationId: CreateQuizWithQ&A
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       description: Quiz data
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewQuizBulk'
     *     responses:
     *       '201':
     *         description: A new quiz with Q&A has been created.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Quiz'
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     */

    this.router.post(
      "/bulk",
      //validateJWT("access"),
      //stripNestedObjects(),
      (req, res) => this.handleCreateBulk(req, res),
    );
    this.router.patch(
      "/:id/bulk",
      //validateJWT("access"),
      //stripNestedObjects(),
      (req, res) => this.handleUpdateBulk(req, res),
    );

    /**
     * @swagger
     * '/quiz/{id}':
     *   put:
     *     tags:
     *       - Quiz
     *     summary: Update a quiz by ID
     *     operationId: UpdateQuiz
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *     requestBody:
     *       description: Quiz data to update
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditQuiz'
     *     responses:
     *       '200':
     *         description: The quiz has been updated.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Quiz'
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
      (req, res) => this.handleUpdate(req, res),
    );

    /**
     * @swagger
     * '/quiz/{id}':
     *   delete:
     *     tags:
     *       - Quiz
     *     summary: Delete a quiz by ID
     *     operationId: DeleteQuiz
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: Numeric ID of the quiz to delete
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: The quiz has been deleted.
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
      (req, res) => this.handleDelete(req, res),
    );

    return this.router;
  }

  async handleCreateBulk(req: Request, res: Response) {
    try {
      const values = parseBody(req);
      const result = await this.create(values);

      const { questions } = values;
      questions.forEach(x => {
        x.quizId = result.id;
      });

      const createBulkquestion = await QuizQuestion.bulkCreate(questions);

      return Controller.created(res, { result, createBulkquestion });
    } catch (err) {
      handleServerError(err, res);
    }
  }

  async handleUpdateBulk(req: Request, res: Response) {
    try {
      const id = parseId(req);
      const quiz = await Quiz.findByPk(id);
      if (!quiz) return Controller.notFound(res, "Quiz not found");
      const { courseId, duration, passingScore, questions } = parseBody(req);

      await Quiz.update(
        { courseId, duration, passingScore },
        { where: { id } },
      );

      await QuizQuestion.destroy({
        where: { quizId: id },
      });

      questions.forEach(x => {
        x.quizId = id;
      });

      const createBulkquestion = await QuizQuestion.bulkCreate(questions);
      return Controller.created(res, {
        message: "Quiz updated successfully.",
        quizId: id,
        createBulkquestion,
      });
    } catch (err) {
      handleServerError(err, res);
    }
  }
}

const quiz = new QuizController();
export default quiz;
