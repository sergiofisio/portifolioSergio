"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const portifolio = async (req, res) => {
    const { title, description, images, url, github } = req.body;
    try {
        const [portifolioBr, portifoliosFr, portifoliosEn] = await Promise.all([
            prisma.portifoliosBr.findFirst({ where: { title: title.br } }),
            prisma.portifoliosFr.findFirst({ where: { title: title.fr } }),
            prisma.portifoliosEn.findFirst({ where: { title: title.en } }),
        ]);
        if (portifolioBr || portifoliosFr || portifoliosEn) {
            throw new Error("Portifolio já existe");
        }
        const { id } = await prisma.commonFields.create({
            data: {
                titleId: title.br
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, ""),
                url,
                github,
            },
        });
        for (let i = 0; i < images.length; i++) {
            await prisma.image.create({
                data: {
                    url: images[i].url,
                    alt: `image ${i + 1} ${title.br}`,
                    commonFieldsId: id,
                },
            });
        }
        await Promise.all([
            prisma.portifoliosBr.create({
                data: {
                    title: title.br,
                    description: description.br,
                    commonFieldsId: id,
                },
            }),
            prisma.portifoliosFr.create({
                data: {
                    title: title.fr,
                    description: description.fr,
                    commonFieldsId: id,
                },
            }),
            prisma.portifoliosEn.create({
                data: {
                    title: title.en,
                    description: description.en,
                    commonFieldsId: id,
                },
            }),
        ]);
        res.status(201).send({ message: "Portifolio criado com sucesso" });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.default = portifolio;
//# sourceMappingURL=portifolio.create.js.map