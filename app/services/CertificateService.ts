import { Certificate } from "@/db/models/Certificate/model/Certificate";
import { Course } from "@/db/models/Course/model/Course";
import { User } from "@/db/models/User/model/User";
import { Controller } from "@/libraries/Controller";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import * as puppeteer from "puppeteer";
import { PDFOptions } from "puppeteer";

async function generateCustomPDF(certificate) {
  const projectRoot = path.resolve(__dirname, "../");
  const htmlFilePath = path.join(projectRoot, "HTMLCertificate/index.html");
  let htmlContent = fs.readFileSync(htmlFilePath, "utf8");
  htmlContent = htmlContent.replace(/Name Surname/g, certificate.user.name);
  htmlContent = htmlContent.replace(
    /Nombre del curso/g,
    certificate.course.name,
  );

  // Establece las opciones de idioma y formato para español
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
    const { id: certificateID } = req.params;
    const id = req.session.jwt.id;
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

    // Define un nombre de archivo para el PDF
    const fileName = `certificate-for-${certificate.user.name}.pdf`;

    // Envía el PDF como una respuesta HTTP para descargar
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `${type}; filename=${fileName}`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generando el PDF:", error);
    return Controller.serverError(res, "Error generating PDF");
  }
};
