import { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImg = async (req: Request, res: Response) => {
  console.log({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "Nenhum ficheiro foi enviado." });
  }

  try {
    const uploadToCloudinary = (fileBuffer: Buffer) => {
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error: any, result: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };
    const result = await uploadToCloudinary(file.buffer);
    return res.status(201).json({ url: result.secure_url, fileExist: false });
  } catch (err) {
    console.error("Erro ao fazer upload para o Cloudinary:", err);

    return res.status(500).json({
      error: "Erro ao fazer o upload do ficheiro para o Cloudinary",
    });
  }
};

export default uploadImg;
