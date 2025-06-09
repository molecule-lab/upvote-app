import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ulid } from "ulid";
import { envVariables } from "./app-config";

const s3 = new S3Client({
  region: "ap-southeast-1",
});

const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  const fileKey = `uploads/${ulid()}-${file.originalname}`;

  const uploadParams = {
    Bucket: envVariables.S3_BUCKET_NAME!,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return encodeURI(
    `https://s3.ap-southeast-1.amazonaws.com/${envVariables.S3_BUCKET_NAME}/${fileKey}`
  );
};

export { uploadToS3 };
