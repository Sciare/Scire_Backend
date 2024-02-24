import { config } from "@/config";
import {
  BlobSASPermissions,
  BlobUploadCommonResponse,
  BlockBlobUploadOptions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { Readable } from "stream";

const { BlobServiceClient } = require("@azure/storage-blob");
export const connectionString = config.auth.azure.Blob.connectionString;
export const containerName = config.auth.azure.Blob.containerName;
const blobServiceClient = BlobServiceClient.fromConnectionString(
  connectionString,
);
export const containerClient = blobServiceClient.getContainerClient(
  containerName,
);

export const getPublicReadUrl = async (
  path: string,
  containerName: string,
  download = false,
  fileName = "",
): Promise<string> => {
  const containerUrl = containerClient.url;
  const blobName = path;

  const sharedKeyCredential = new StorageSharedKeyCredential(
    config.auth.azure.Blob.storageAccountName,
    config.auth.azure.Blob.storageAccountKey,
  );

  const permissions = download
    ? BlobSASPermissions.parse("r")
    : BlobSASPermissions.parse("r"); // Adjust the permissions as per your requirements

  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1); // Set the expiry date/time as per your requirements

  const sasQueryParameters = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions,
      startsOn: new Date(),
      expiresOn: expiryDate,
    },
    sharedKeyCredential,
  );

  const sasUrl = `${containerUrl}/${blobName}?${sasQueryParameters.toString()}`;

  return sasUrl;
};

export const getPublicUploadUrl = async (
  path: string,
  contentType: string,
  containerName: string,
): Promise<string> => {
  const containerUrl = containerClient.url;
  const blobName = path;

  const sharedKeyCredential = new StorageSharedKeyCredential(
    config.auth.azure.Blob.storageAccountName,
    config.auth.azure.Blob.storageAccountKey,
  );

  const permissions = BlobSASPermissions.parse("w"); // Permiso de escritura

  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 10); // Expiración de 10 minutos (ajusta según tus necesidades)

  const sasQueryParameters = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions,
      startsOn: new Date(),
      expiresOn: expiryDate,
    },
    sharedKeyCredential,
  );
  const sasUrl = `${containerUrl}/${blobName}?${sasQueryParameters.toString()}`;
  return sasUrl;
};

export const getBlobFileStream = async (
  containerName: string,
  blobName: string,
): Promise<Readable | null> => {
  try {
    const blobClient = containerClient.getBlobClient(blobName);
    const exists = await blobClient.exists();
    if (!exists) {
      return null;
    }

    const downloadResponse = await blobClient.download();
    const blobStream = downloadResponse.readableStreamBody;

    return blobStream;
  } catch (error) {
    if (error.statusCode === 404) {
      return null;
    }
    console.error(error);
    throw error;
  }
};

export const putBlobFile = async (
  blobName: string,
  data: any,
  options?: BlockBlobUploadOptions,
): Promise<BlobUploadCommonResponse> => {
  try {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const response = await blockBlobClient.upload(data, data.length, options);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBlobFile = async (blobName: string) => {
  try {
    const blobClient = containerClient.getBlobClient(blobName);
    await blobClient.delete();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
