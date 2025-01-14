"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImg = async (req, res) => {
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
        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
                streamifier_1.default.createReadStream(fileBuffer).pipe(uploadStream);
            });
        };
        const result = await uploadToCloudinary(file.buffer);
        return res.status(201).json({ url: result.secure_url, fileExist: false });
    }
    catch (err) {
        console.error("Erro ao fazer upload para o Cloudinary:", err);
        return res.status(500).json({
            error: "Erro ao fazer o upload do ficheiro para o Cloudinary",
        });
    }
};
exports.default = uploadImg;
//# sourceMappingURL=upload.js.map