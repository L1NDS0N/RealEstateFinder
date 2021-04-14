import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Sweeping } from '../services/SweepScrap';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { AppError } from '../errors/AppError';

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

    res.status(400).json({ error: 'URL cannot be null' });

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
