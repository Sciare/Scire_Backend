import { Certificate } from "@/db/models/Certificate/model/Certificate";
import { ModelController } from "@/libraries/ModelController";
import { stripNestedObjects, validateJWT } from "@/policies/General";
import { Router } from "express";

export class CertificateController extends ModelController<Certificate> {
  constructor() {
    super();
    this.name = "certificate";
    this.model = Certificate;
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
      (req, res) => this.handleCreate(req, res),
    );
    this.router.put(
      "/:id",
      //validateJWT("access"),
      stripNestedObjects(),
      (req, res) => this.handleUpdate(req, res),
    );
    this.router.delete("/:id", validateJWT("access"), (req, res) =>
      this.handleDelete(req, res),
    );

    return this.router;
  }
}

const certificate = new CertificateController();
export default certificate;
