"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updatePortifolio = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const info = await prisma.commonFields.findUnique({
            where: { id: Number(id) },
            include: {
                images: true,
                portifolioBr: true,
                portifolioFr: true,
                portifolioEn: true,
            },
        });
        if (!info)
            return res.status(404).send({ message: "Portifolio inexistente" });
        const updateData = {
            br: {},
            en: {},
            fr: {},
        };
        ["br", "en", "fr"].forEach((lang) => {
            if (data.title)
                updateData[lang].title = data.title[lang];
            if (data.description)
                updateData[lang].description = data.description[lang];
        });
        await prisma.portifoliosBr.update({
            where: {
                id: info.portifolioBr[0].id,
            },
            data: updateData.br,
        });
        await prisma.portifoliosEn.update({
            where: {
                id: info.portifolioEn[0].id,
            },
            data: updateData.en,
        });
        await prisma.portifoliosFr.update({
            where: {
                id: info.portifolioFr[0].id,
            },
            data: updateData.fr,
        });
        return res.status(202).json({ message: "update" });
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.default = updatePortifolio;
//# sourceMappingURL=portifolio.update.js.map