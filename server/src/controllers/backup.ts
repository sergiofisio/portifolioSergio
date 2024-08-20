import { PrismaClient } from "@prisma/client";
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";
import os from "os";
import { Request, Response } from "express";
import { CustomError } from "./../class/class";
import axios from "axios"; // Import axios

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_HOST,
  secure: true,
  port: 465,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASSWORD,
  },
});

async function backup(req?: Request, res?: Response): Promise<void> {
  console.log("Starting backup...");
  const date = new Date().toISOString().replace(/:/g, "-");

  try {
    if (req) {
      const url = req.protocol + "://" + req.get("host");
      const {
        data: { init },
      } = await axios.get(url);

      if (!init) {
        if (res) {
          throw new CustomError("Initialization failed", 400);
        }
      }
    }

    const tables = Object.keys(prisma).filter(
      (key) => typeof (prisma as any)[key]?.findMany === "function"
    );

    const backupData = await Promise.all(
      tables.map((table) => (prisma as any)[table].findMany())
    );

    const backupPath = path.join(os.tmpdir(), "backup.json");
    fs.writeFileSync(backupPath, JSON.stringify(backupData));

    await prisma.$disconnect();

    let mailOptions = {
      from: process.env.EMAIL,
      to: "sergiobastosfisio@yahoo.com.br",
      subject: `Database Backup - PORTIFOLIO DATA: ${date}`,
      text: "Please find attached the latest database backup.",
      attachments: [
        {
          path: backupPath,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        throw new CustomError("Erro ao enviar o email", 400);
      }
      console.log("Email sent: " + info.response);
      fs.unlinkSync(backupPath);
      if (res) {
        res.status(201).json({ message: "Backup completed and email sent." });
      }
    });
    console.log("Backup completed.");
  } catch (error: any) {
    console.error(error);
    if (res) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Erro ao fazer o backup" });
    }
  }
}

export default backup;
