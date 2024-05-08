import { Request, Response } from "express";
import multer from "multer";
import path from "path";

const upload = multer({ dest: "uploads/" });

export default async function uploadFile(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).send({ message: "No file uploaded" });
    return;
  }
  console.log(req.file);

  const filePath = path.join(__dirname, "../uploads/", req.file.originalname);

  try {
    res.json({ filePath: filePath });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
}
