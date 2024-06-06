import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const portifolio = async (req: Request, res: Response) => {
  const { title, description, image, url, github } = req.body;

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
        image,
        url,
        github,
      },
    });

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
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export default portifolio;
