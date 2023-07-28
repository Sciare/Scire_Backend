import { ModelController } from "@/libraries/ModelController";
import { Enrollment } from "@/db/models/Enrollment/model/Enrollment";
import { Router } from "express";
import {
  validateJWT,
  filterOwner,
  appendUser,
  stripNestedObjects,
} from "@/policies/General";
import { validateBody } from "@/libraries/Validator";
import {
  EnrollmentSchema,
  UpdateEnrollmentSchema,
} from "@/validators/Enrollment";

export class EnrollmentController extends ModelController<Enrollment> {
  constructor() {
    super();
    this.name = "enrollment";
    this.model = Enrollment;
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
      //validateJWT("access"),
      //filterOwner(),
      (req, res) => this.handleFindOne(req, res),
    );
    this.router.post(
      "/",
      //validateJWT("access"),
      //filterOwner(),
      //appendUser(),
      validateBody(EnrollmentSchema),
      (req, res) => this.handleCreate(req, res),
    );
    this.router.put(
      "/:id",
      //validateJWT("access"),
      //filterOwner(),
      //appendUser(),
      validateBody(UpdateEnrollmentSchema),
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

const enrollment = new EnrollmentController();
export default enrollment;
