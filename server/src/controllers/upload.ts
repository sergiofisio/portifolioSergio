import { Request, Response } from "express";

import multer from "multer";

const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.BACKBLAZE_ENDPOINT_S3);
const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.BACKBLAZE_KEYID,
    secretAccessKey: process.env.BACKBLAZE_APPLICATIONKEY,
  },
});

const uploadImg = async (req: Request, res: Response) => {
  const file: any = req.file;

  try {
    const upload = await s3
      .upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
    const location = upload.Location;

    if (!location.includes("https://") && !location.includes("http://")) {
      upload.Location = `https://f005.backblazeb2.com/file${location}`;
    }

    return res.status(201).json({ file: upload });
  } catch (error: any) {
    console.log(error);

    return res
      .status(error.status || 500)
      .json({ error: error.message || "Erro ao fazer o upload do arquivo" });
  }
};

export default uploadImg;
