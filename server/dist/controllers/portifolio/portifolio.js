"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const allPortifolios = async (_, res) => {
    try {
        const portifolios = await prisma.commonFields.findMany({
            include: {
                images: true,
                portifolioBr: true,
                portifolioFr: true,
                portifolioEn: true,
            },
        });
        res.status(200).json({ portifolios });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.default = allPortifolios;
//# sourceMappingURL=portifolio.js.map