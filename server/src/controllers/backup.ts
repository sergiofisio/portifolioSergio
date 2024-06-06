import { PrismaClient } from "@prisma/client";
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";
import os from "os";

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

async function backup(): Promise<void> {
  console.log("Starting backup...");
  try {
    const tables = Object.keys(prisma).filter(
      (key) => typeof (prisma as any)[key]?.findMany === "function"
    );

    let backupData: { [key: string]: any } = {};

    for (let table of tables) {
      const data = await (prisma as any)[table].findMany();
      backupData[table] = data;
    }

    const backupPath = path.join(os.tmpdir(), "backup.json");
    fs.writeFileSync(backupPath, JSON.stringify(backupData));

    await prisma.$disconnect();

    let mailOptions = {
      from: process.env.ZOHO_USER,
      to: "sergiobastosfisio@yahoo.com.br",
      subject: "Database Backup",
      text: "Please find attached the latest database backup.",
      attachments: [
        {
          path: backupPath,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        fs.unlinkSync(backupPath); // remove the file after sending the email
      }
    });
    console.log("Backup completed.");
  } catch (error) {
    console.error(error);
  }
}

export default backup;
