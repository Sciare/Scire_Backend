import { ModelController } from "@/libraries/ModelController";
import { Lesson } from "@/db/models/Lesson/model/Lesson";
import { Router } from "express";
import {
  validateJWT,
  filterOwner,
  stripNestedObjects,
} from "@/policies/General";
import { validateBody } from "@/libraries/Validator";
import { LessonSchema, UpdateLessonSchema } from "@/validators/Lesson";

export class LessonController extends ModelController<Lesson> {
  constructor() {
    super();
    this.name = "lesson";
    this.model = Lesson;
  }

  routes(): Router {
    this.router.get(
      "/",
      //validateJWT("access"),
      (req, res) => this.handleFindAll(req, res),
    );
    this.router.get(
      "/:id",
      //validateJWT("access"),
      (req, res) => this.handleFindOne(req, res),
    );
    this.router.post(
      "/",
      //validateJWT("access"),
      stripNestedObjects(),
      validateBody(LessonSchema),
      (req, res) => this.handleCreate(req, res),
    );
    this.router.put(
      "/:id",
      //validateJWT("access"),
      validateBody(UpdateLessonSchema),
      stripNestedObjects(),
      (req, res) => this.handleUpdate(req, res),
    );
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
