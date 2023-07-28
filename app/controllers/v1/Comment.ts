import { ModelController } from "@/libraries/ModelController";
import { Comment } from "@/db/models/Comment/model/Comment";
import { Router } from "express";
import {
  validateJWT,
  filterOwner,
  appendUser,
  stripNestedObjects,
} from "@/policies/General";
import { validateBody } from "@/libraries/Validator";
import { CommentSchema, UpdateCommentSchema } from "@/validators/Comment";

export class CommentController extends ModelController<Comment> {
  constructor() {
    super();
    this.name = "comment";
    this.model = Comment;
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
      stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      validateBody(CommentSchema),
      (req, res) => this.handleCreate(req, res),
    );
    this.router.put(
      "/:id",
      //validateJWT("access"),
      stripNestedObjects(),
      //filterOwner(),
      //appendUser(),
      validateBody(UpdateCommentSchema),
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

const comment = new CommentController();
export default comment;
