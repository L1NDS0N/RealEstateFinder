import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Sweeping } from '../services/SweepScrap';

const prisma = new PrismaClient();

class OlxFinderController {
  async NovaPesquisa(req: Request, res: Response) {
    const { url, cidade, tipo } = req.body;
    const pesquisaCriada = await prisma.pesquisa.create({
      data: {
        url,
        cidade,
        tipo,
      },
    });
    // await Sweeping(pesquisaCriada);

    return res.json(pesquisaCriada);

    await prisma.$disconnect();
  }
}
export { OlxFinderController };
