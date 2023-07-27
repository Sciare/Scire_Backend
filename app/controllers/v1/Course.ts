import { ModelController } from "@/libraries/ModelController";
import { Course } from "@/db/models/Course/model/Course";
import { Router } from "express";
import {
  validateJWT,
  filterOwner,
  appendUser,
  stripNestedObjects,
} from "@/policies/General";
import { validateBody } from "@/libraries/Validator";
import { CourseSchema, UpdateCourseSchema } from "@/validators/Group";

export class CourseController extends ModelController<Course> {
  constructor() {
    super();
    this.name = "course";
    this.model = Course;
  }

  routes(): Router {
    this.router.get(
      "/",
      //validateJWT("access"),
      //filterOwner(),
      (req, res) => this.handleFindAll(req, res),
    );
    this.router.get(
      "/:id",
      // validateJWT("access"),
      //filterOwner(),
      (req, res) => this.handleFindOne(req, res),
    );
    this.router.post(
      "/",
      //validateJWT("access"),
      //filterOwner(),
      //appendUser(),
      validateBody(CourseSchema),
      (req, res) => this.handleCreate(req, res),
    );
    this.router.put(
      "/:id",
      //validateJWT("access"),
      //stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      validateBody(UpdateCourseSchema),
      (req, res) => this.handleUpdate(req, res),
    );
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
