import { Course } from "@/db/models/Course/model/Course";
import { ModelController } from "@/libraries/ModelController";
import { validateBody } from "@/libraries/Validator";
import { CourseSchema, UpdateCourseSchema } from "@/validators/Course";
import { Router } from "express";

export class CourseController extends ModelController<Course> {
  constructor() {
    super();
    this.name = "course";
    this.model = Course;
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Course
     *     description: Operations related to courses
     */

    /**
     * @swagger
     * components:
     *   requestBodies:
     *     NewCourse:
     *       required: true
     *       description: Course data
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NewCourse'
     *     EditCourse:
     *       required: true
     *       description: Course data for update
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/EditCourse'
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     NewCourse:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *           description: The name of the course.
     *         description:
     *           type: string
     *           description: A brief description of the course.
     *         duration:
     *           type: integer
     *           description: The duration of the course in minutes.
     *         author:
     *           type: integer
     *           description: The ID of the author who created the course.
     *         school_id:
     *           type: integer
     *           description: The ID of the school associated with the course.
     *         is_active:
     *           type: boolean
     *           description: Indicates if the course is active.
     *         tags:
     *           type: array
     *           items:
     *             type: string
     *           description: Tags associated with the course.
     *         cover:
     *           type: integer
     *           description: The foreign key pointing to the associated cover image.
     *       required:
     *         - name
     *         - author
     *         - school_id
     *
     *     EditCourse:
     *       type: object
     *       properties:
     *         name:
     *           type: string
     *           description: The name of the course.
     *         description:
     *           type: string
     *           description: A brief description of the course.
     *         duration:
     *           type: integer
     *           description: The duration of the course in minutes.
     *         is_active:
     *           type: boolean
     *           description: Indicates if the course is active.
     *         tags:
     *           type: array
     *           items:
     *             type: string
     *           description: Tags associated with the course.
     */

    /**
     * @swagger
     * '/course':
     *   get:
     *     tags:
     *       - Course
     *     summary: Get all course entries
     *     operationId: GetAllCourses
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
     *                         $ref: '#/components/schemas/NewCourse'
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
     * '/course/{id}':
     *   get:
     *     tags:
     *       - Course
     *     summary: Get a course entry by id
     *     operationId: FindCourseById
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
     *                       $ref: '#/components/schemas/NewCourse'
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
      // validateJWT("access"),
      //filterOwner(),
      (req, res) => this.handleFindOne(req, res),
    );
    /**
     * @swagger
     * '/course':
     *   post:
     *     tags:
     *       - Course
     *     summary: Create a Course entry
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
     *                       $ref: '#/components/schemas/Course'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/NewCourse'
     */
    this.router.post(
      "/",
      //validateJWT("access"),
      //filterOwner(),
      //appendUser(),
      validateBody(CourseSchema),
      (req, res) => this.handleCreate(req, res),
    );
    /**
     * @swagger
     * '/course/{id}':
     *   patch:
     *     tags:
     *       - Course
     *     summary: Update Course by id
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
     *                       $ref: '#/components/schemas/Course'
     *       '401':
     *         $ref: '#/components/responses/UnauthorizedError'
     *       '403':
     *         $ref: '#/components/responses/ForbiddenError'
     *       '404':
     *         $ref: '#/components/responses/NotFoundError'
     *       '500':
     *         $ref: '#/components/responses/InternalServerError'
     *     requestBody:
     *       $ref: '#/components/requestBodies/EditCourse'
     */
    this.router.patch(
      "/:id",
      //validateJWT("access"),
      //stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      validateBody(UpdateCourseSchema),
      (req, res) => this.handleUpdate(req, res),
    );
    /**
     * @swagger
     * '/course/{id}':
     *   delete:
     *     tags:
     *       - Course
     *     summary: Delete a course entry by id
     *     operationId: DeleteCourseById
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

const course = new CourseController();
export default course;
