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

    await Sweeping(pesquisaCriada).then(hrefs => {
      hrefs.map(href => {
        console.log('this is the href updatind now:', href);
        prisma.pesquisa.update({
          where: { id: pesquisaCriada.id },
          data: {
            Links: {
              create: { href: href },
            },
          },
        });
      });
    });
    await prisma.$disconnect();
    return res.json(pesquisaCriada);
  }
}
export { OlxFinderController };
