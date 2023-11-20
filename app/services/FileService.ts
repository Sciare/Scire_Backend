import { config } from "@/config";
import { File } from "@/db/models/File/model/File";
import {
  BlobSASPermissions,
  BlockBlobUploadOptions,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import mime from "mime-types";
import { extname } from "path";
import { WhereOptions } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import {
  containerClient,
  deleteBlobFile,
  getPublicUploadUrl,
  putBlobFile,
} from "./FileManagerService";

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

interface GetFileParams {
  id: number;
  where: WhereOptions;
}

interface CreateFileParams {
  fileName: string;
  type: string;
}

interface UploadURL {
  uploadUrl: string;
}

export const getFile = async ({
  id,
  where,
}: RequireAtLeastOne<GetFileParams>) => {
  const whereOptions = id ? { id, ...where } : where;
  const file = await File.findOne({ where: whereOptions });
  if (!file) {
    throw new Error("Not Found");
  }

  return file;
};

export const createFileInDB = async ({ fileName, type }: CreateFileParams) => {
  const extension = extname(fileName).toLowerCase();
  const path = `${type}/${uuidv4()}${extension}`;
  const contentType = mime.contentType(fileName) || "application/octet-stream";
  const validExtensions = [".jpeg", ".jpg", ".png", ".mp4", "mov"];

  if (!validExtensions.includes(extension)) {
    throw new Error("Invalid extension");
  }

  const created = await File.create({
    type,
    fileName,
    path,
    isUploaded: false,
  });

  const uploadUrl = await getPublicUploadUrl(
    path,
    contentType,
    config.auth.azure.Blob.containerName,
  );

  const result: Partial<File> & UploadURL = { ...created.toJSON(), uploadUrl };
  return result;
};

interface UploadFileParams {
  fileContent: string | Buffer;
  fileName: string;
  type: string;
}

export const createAndUploadFile = async (
  fileContent: Buffer | string,
  fileName: string,
  type: string,
) => {
  const extension = extname(fileName);
  const path = `${type}/${uuidv4()}${extension}`;
  const newFile: File = await File.create({
    type,
    fileName,
    path,
    isUploaded: false,
  });

  const fileBuffer: Buffer =
    typeof fileContent === "string"
      ? Buffer.from(fileContent, "base64")
      : fileContent;

  const contentType = "image/jpeg";
  const options: BlockBlobUploadOptions = {
    blobHTTPHeaders: {
      blobContentType: contentType || "application/octet-stream",
    },
    metadata: {
      fileType: "image",
    },
  };

  const isUploaded = await putBlobFile(path, fileBuffer, options)
    .then(() => true)
    .catch(() => false);

  await newFile.update({ isUploaded });
  return newFile;
};

export const deleteFileFromBlobAndDB = async (id: number) => {
  const file: File = await File.findByPk(id);
  if (!file) {
    return;
  }

  await file.destroy(); // Deletes File from db

  const key = file.path
    .split("/")
    .slice(-2)
    .join("/");

  deleteBlobFile(key);
};

export const getFileUrl = async (path, fileName) => {
  const containerUrl = containerClient.url;
  const blobName = path;

  const sharedKeyCredential = new StorageSharedKeyCredential(
    config.auth.azure.Blob.storageAccountName,
    config.auth.azure.Blob.storageAccountKey,
  );

  const permissions = BlobSASPermissions.parse("r");
  const startsOn = new Date();
  const expiresOn = new Date(startsOn.valueOf() + 60 * 60 * 1000);

  const sasQueryParameters = generateBlobSASQueryParameters(
    {
      containerName: config.auth.azure.Blob.containerName,
      blobName,
      permissions,
      startsOn,
      expiresOn,
    },
    sharedKeyCredential,
  );

  const url = `${containerUrl}/${blobName}?${sasQueryParameters.toString()}`;
  const downloadUrl = `${containerUrl}/${blobName}?${sasQueryParameters.toString()}&${encodeURIComponent(
    "response-content-disposition",
  )}=${encodeURIComponent(`attachment; filename="${fileName}"`)}`;

  return { url, downloadUrl };
};
