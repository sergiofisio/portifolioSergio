import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Lang, PrismaKeys } from "../../type/type";
const prisma = new PrismaClient();

const updatePortifolio = async (req: Request, res: Response) => {
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

    const updateData: Record<Lang, { title?: string; description?: string }> = {
      br: {},
      en: {},
      fr: {},
    };

    (["br", "en", "fr"] as Lang[]).forEach((lang) => {
      if (data.title) updateData[lang].title = data.title[lang];
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
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

export default updatePortifolio;
