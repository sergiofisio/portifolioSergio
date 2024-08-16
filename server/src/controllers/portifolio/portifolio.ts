import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const allPortifolios = async (_: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export default allPortifolios;
