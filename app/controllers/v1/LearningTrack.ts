import { LearningTrack } from "@/db/models/LearningTrack/model/LearningTrack";
import { ModelController } from "@/libraries/ModelController";
import { stripNestedObjects } from "@/policies/General";
import { Router } from "express";

export class LearningTrackController extends ModelController<LearningTrack> {
  constructor() {
    super();
    this.name = "learningtrack";
    this.model = LearningTrack;
  }

  routes(): Router {
    this.router.get("/", (req, res) => this.handleFindAll(req, res));
    this.router.get("/:id", (req, res) => this.handleFindOne(req, res));
    this.router.post("/", stripNestedObjects(), (req, res) =>
      this.handleCreate(req, res),
    );
    this.router.put("/:id", stripNestedObjects(), (req, res) =>
      this.handleUpdate(req, res),
    );
    this.router.delete("/:id", (req, res) => this.handleDelete(req, res));

    return this.router;
  }
}

const learningtrack = new LearningTrackController();
export default learningtrack;
