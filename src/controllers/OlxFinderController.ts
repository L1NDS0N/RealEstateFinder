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

    await Sweeping(pesquisaCriada)
      .then(hrefs => {
          hrefs.map(async href => {
            await prisma.pesquisa.update({
              where: { id: pesquisaCriada.id },
              data: {
                Links: {
                  create: { href },
                },
              },
            }).catch(e => {
              console.log(e);
            });
          });
        })
      .catch(e => {
        console.log(e);
      });

    await prisma.$disconnect();
    return res.json(pesquisaCriada);
  }
}
export { OlxFinderController };
