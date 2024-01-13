import { Lesson } from "@/db/models/Lesson/model/Lesson";
import { ModelController } from "@/libraries/ModelController";
import { validateBody } from "@/libraries/Validator";
import { stripNestedObjects } from "@/policies/General";
import { lastLessonTaken } from "@/services/LearningTrackerService";
import { LessonSchema, UpdateLessonSchema } from "@/validators/Lesson";
import { Router } from "express";

export class LessonController extends ModelController<Lesson> {
  constructor() {
    super();
    this.name = "lesson";
    this.model = Lesson;
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Lesson
     *     description: Operations related to lessons in the course
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewLesson:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *           description: The name of the lesson.
     *         description:
     *           type: string
     *           description: A brief description of the lesson.
     *         courseId:
     *           type: integer
     *           description: The ID of the course to which the lesson belongs.
     *         duration:
     *           type: integer
     *           description: The duration of the lesson in minutes.
     *         video:
     *           type: integer
     *           description: The foreign key pointing to the associated video file.
     *       required:
     *         - name
     *         - courseId
     *
     *   requestBodies:
     *     NewLesson:
     *       required: true
     *       description: Lesson data
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewLesson'
     */

    /**
     * @swagger
     * '/lesson':
     *   get:
     *     tags:
     *       - Lesson
     *     summary: Get all lesson entries
     *     operationId: GetAllLessons
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
     *                         $ref: '#/components/schemas/NewLesson'
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
      (req, res) => this.handleFindAll(req, res),
    );

    this.router.get(
      "/learningTracker",
      //validateJWT("access"),
      (req, res) => lastLessonTaken(req, res),
    );

    /**
     * @swagger
     * '/lesson/{id}':
     *   get:
     *     tags:
     *       - Lesson
     *     summary: Get a lesson entry by id
     *     operationId: FindLessonById
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
     *                       $ref: '#/components/schemas/NewLesson'
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
     * '/lesson':
     *   post:
     *     tags:
     *       - Lesson
     *     summary: Create a Lesson entry
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '201':
     *         description: The request has succeeded and a new lesson has been created.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/CreatedResponse'
     *                 - type: object
     *                   properties:
     *                     data:
     *                       $ref: '#/components/schemas/NewLesson'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/NewLesson'
     */
    this.router.post(
      "/",
      //validateJWT("access"),
      stripNestedObjects(),
      validateBody(LessonSchema),
      (req, res) => this.handleCreate(req, res),
    );

    /**
     * @swagger
     * '/lesson/{id}':
     *   patch:
     *     tags:
     *       - Lesson
     *     summary: Update Lesson by id
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - $ref: '#/components/parameters/id'
     *     responses:
     *       '200':
     *         description: The request has succeeded and the lesson has been updated.
     *         content:
     *           application/json:
     *             schema:
     *               allOf:
     *                 - $ref: '#/components/schemas/CreatedResponse'
     *                 - type: object
     *                   properties:
     *                     data:
     *                       $ref: '#/components/schemas/NewLesson'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/EditLesson'
     */
    this.router.patch(
      "/:id",
      //validateJWT("access"),
      validateBody(UpdateLessonSchema),
      stripNestedObjects(),
      (req, res) => this.handleUpdate(req, res),
    );

    /**
     * @swagger
     * '/lesson/{id}':
     *   delete:
     *     tags:
     *       - Lesson
     *     summary: Delete a lesson entry by id
     *     operationId: DeleteLessonById
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
      (req, res) => this.handleDelete(req, res),
    );

    return this.router;
  }
}

const lesson = new LessonController();
export default lesson;
