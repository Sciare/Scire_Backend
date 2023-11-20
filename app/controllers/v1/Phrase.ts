import { Controller, handleServerError } from "@/libraries/Controller";
import axios from "axios";
import { Router } from "express";

export class PhraseController extends Controller {
  constructor() {
    super();
    this.name = "phrase";
  }

  routes(): Router {
    /**
     * @swagger
     * tags:
     *   - name: Phrase
     *     description: Phrase for the welcome view
     */
    /**
     * @swagger
     * '/phrase':
     *   get:
     *     tags:
     *       - Phrase
     *     summary: Get a phrase by day for the welcome loading screen
     *     operationId: GetPhrase
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
     *                       type: string
     *       '400':
     *         $ref: '#/components/responses/BadRequestError'
     */
    this.router.get("/", (req, res) => this.getPhrase(res));
    return this.router;
  }

  async getPhrase(res) {
    try {
      axios
        .get("https://frasedeldia.azurewebsites.net/api/phrase")
        .then(response => {
          return Controller.ok(res, response.data.phrase);
        })
        .catch(error => {
          console.error("Axios error:", error);
          console.error("Response data:", error.response);
        });
    } catch (error) {
      handleServerError(error, res);
    }
  }
}

const phrase = new PhraseController();
export default phrase;
