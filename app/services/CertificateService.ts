import { Certificate } from "@/db/models/Certificate/model/Certificate";
import { Course } from "@/db/models/Course/model/Course";
import { User } from "@/db/models/User/model/User";
import { Controller } from "@/libraries/Controller";
import { decodeTokenFromParams } from "@/utils/decodeToken";
import { Request, Response } from "express";
import * as puppeteer from "puppeteer";
import { PDFOptions } from "puppeteer";

async function generateCustomPDF(certificate) {
  let htmlContent = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Certificado de Participación</title>
    <style>
      @page {
        size: landscape;
      }
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .certificate {
        width: 1024px;
        height: 768px;
        background: linear-gradient(to bottom right, #fff, #dedede);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
        border: 10px solid #fff;
        position: relative;
        color: black;
      }
      .certificate-header {
        padding: 20px;
        display: flex;
        justify-content: center;
      }
      .certificate-header h1 {
        margin: 0;
      }
      .certificate-body {
        padding: 18% 20px;
        text-align: center;
      }
      .certificate-body h2 {
        margin: 0;
        font-size: 4em;
      }
      .certificate-body h3 {
        margin: 10px 0;
        font-size: 2em;
      }
      .certificate-body p {
        margin: 20px 0 45px;
      }
      .certificate-footer {
        position: absolute;
        bottom: 20px;
        left: 120px;
        right: 120px;
        display: flex;
        justify-content: space-between;
      }
      .signature {
        text-align: center;
      }
      .signature img {
        width: 150px;
      }
      .logo {
        width: 120px;
        position: absolute;
        top: 5%;
      }
      .logo.left {
        left: 60px;
      }
      .logo.right {
        right: 60px;
      }
      .decorative-swoosh {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("./image1.png") no-repeat;
        background-size: contain;
      }
    </style>
  </head>
  <body>
    <div class="certificate">
      <div class="decorative-swoosh"></div>
      <div class="certificate-header"></div>
      <div class="certificate-body">
        <img
          src="https://argenisgonzalez-ksquare.github.io/html/scire.png"
          alt="Logo SCIRE"
          class="logo right"
        />
        <img
          src="https://www.ucateci.edu.do/images/archivos/logo/Logo-UCATECI-2.png"
          alt="Logo UCATE"
          class="logo left"
        />
        <h2 style="color: '#2E3192';">CERTIFICADO DE LOGRO</h2>
        <h3>ESTE DOCUMENTO ACREDITA A:</h3>
        <p class="recipient-name"><strong>Name Surname</strong></p>
        <p>
          Por su participación en el curso
          <strong>Nombre del curso</strong> acreditado por la plataforma de
          formación educativa SCIRE y por la institución de estudio superior de
          UCATECI.
        </p>
        <p>Concluido el <strong>fecha de expedición</strong><br /></p>
      </div>
      <div class="certificate-footer">
        <div class="signature">
          <img
            src="https://argenisgonzalez-ksquare.github.io/html/firma1.png"
            alt="Descripción de la imagen"
          />
          <p><strong>Director de Ucateci</strong></p>
          <p>Dr. Juan de Jesus Cabrera</p>
        </div>
        <div class="signature">
          <img
            src="https://argenisgonzalez-ksquare.github.io/html/firma2.png"
            alt="Firma Digital 2"
          />
          <p><strong>Director de SCIRE</strong></p>
          <p>Ing. Ericsson Ant. Reyes</p>
        </div>
      </div>
    </div>
  </body>
</html>`;

  htmlContent = htmlContent.replace(/Name Surname/g, certificate.user.name);
  htmlContent = htmlContent.replace(
    /Nombre del curso/g,
    certificate.course.name,
  );

  // opciones de idioma y formato para español
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const issueDateStr = certificate.dateIssued;
  const issueDate = new Date(issueDateStr);
  const formattedDate = issueDate.toLocaleDateString("es-ES", options);
  htmlContent = htmlContent.replace(/fecha de expedición/g, formattedDate);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  const pdfOptions: PDFOptions = {
    format: "A4" as puppeteer.PaperFormat,
    printBackground: true,
  };

  const pdfBuffer = await page.pdf(pdfOptions);
  await browser.close();
  return pdfBuffer;
}

export const exportPDF = async (req: Request, res: Response) => {
  try {
    const { token } = req.query
    if (!token) return Controller.badRequest(res, "El token debe estar presente como un query params")
    const { id: certificateID } = req.params;
    const id = await decodeTokenFromParams(token)
    let { type } = req.query; // values: "inline" or "attachment"
    type = type ?? "inline";
    const certificate = await Certificate.findOne({
      where: { id: certificateID, userId: id },
      include: [{ model: Course }, { model: User }],
    });

    if (!certificate) {
      return Controller.badRequest(
        res,
        "Invalid certificate or this certificate does not belong to you",
      );
    }

    const pdfBuffer = await generateCustomPDF(certificate);
    const fileName = `certificate-for-${certificate.user.name}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `${type}; filename=${fileName}`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generando el PDF:", error);
    return Controller.serverError(res, "Error generating PDF");
  }
};
