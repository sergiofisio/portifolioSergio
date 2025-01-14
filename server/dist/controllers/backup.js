"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const class_1 = require("./../class/class");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.ZOHO_HOST,
    secure: true,
    port: 465,
    auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASSWORD,
    },
});
async function backup(req, res) {
    console.log("Starting backup...");
    const date = new Date().toISOString().replace(/:/g, "-");
    try {
        if (req) {
            const url = req.protocol + "://" + req.get("host");
            const { data: { init }, } = await axios_1.default.get(url);
            if (!init) {
                if (res) {
                    throw new class_1.CustomError("Initialization failed", 400);
                }
            }
        }
        const tables = Object.keys(prisma).filter((key) => { var _a; return typeof ((_a = prisma[key]) === null || _a === void 0 ? void 0 : _a.findMany) === "function"; });
        const backupData = await Promise.all(tables.map((table) => prisma[table].findMany()));
        const backupPath = path_1.default.join(os_1.default.tmpdir(), "backup.json");
        fs_1.default.writeFileSync(backupPath, JSON.stringify(backupData));
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
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw new class_1.CustomError("Erro ao enviar o email", 400);
            }
            console.log("Email sent: " + info.response);
            fs_1.default.unlinkSync(backupPath);
            if (res) {
                res.status(201).json({ message: "Backup completed and email sent." });
            }
        });
        console.log("Backup completed.");
    }
    catch (error) {
        console.error(error);
        if (res) {
            res
                .status(error.status || 500)
                .json({ error: error.message || "Erro ao fazer o backup" });
        }
    }
}
exports.default = backup;
//# sourceMappingURL=backup.js.map