import { Links } from '.prisma/client';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { AppError } from '../errors/AppError';
import { ScrapPage, Sweeping } from '../services/SweepScrap';

yup.setLocale(pt);

const prisma = new PrismaClient();

class OlxFinderController {
  async NovaPesquisa(req: Request, res: Response) {
    const { url, cidade, tipo } = req.body;

    const schema = yup.object().shape({
      url: yup.string().url().required(),
      cidade: yup.string().notRequired(),
      tipo: yup.string().notRequired(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

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
          await prisma.pesquisa
            .update({
              where: { id: pesquisaCriada.id },
              data: {
                Links: {
                  create: { href },
                },
              },
            })
            .catch(e => {
              console.warn(e);
            });
        });
      })
      .catch(e => {
        console.warn(e);
      });

    await prisma.$disconnect();
    return res.json(pesquisaCriada);
  }

  async Raspar(req: Request, res: Response) {
    const { id } = req.body;

    const listaLinks = await prisma.links.findMany({
      where: { pesquisaId: id },
      // select: { id: true, href: true, pesquisaId: false },
    });

    await ScrapPage(listaLinks)
      .then()
      .catch(e => {
        throw new AppError(e);
      });

    return res.json(
      'Busca sendo processada internamente, os dados serão atualizados em breve',
    );
  }
}

export { OlxFinderController };
