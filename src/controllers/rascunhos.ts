import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OlxFinderController {
  async create() {
    await prisma.imoveisOlx.create({
      data: {
        cidadeBairro: 'São Gonçalo do Amarante, Amarante',
        titulo: 'Casa muito louca',
        preco: 'R$ 160.000',
        link:
          'https://rn.olx.com.br/rio-grande-do-norte/imoveis/cidade-das-rosas-10-x-24-82-m-2-quartos-sendo-1-suite-sala-ampla-786692085s',
        infoAnuncianteOlx: {
          create: { nome: 'Lindson' },
        },
      },
    });

    const allUsers = await prisma.anuncianteOlx.findMany();
    const allImoveis = await prisma.imoveisOlx.findMany();
    console.dir(`Imóveis: ${allImoveis} Usuários: ${allUsers}`, {
      depth: null,
    });
    await prisma.$disconnect();
  }

  // create()
  //   .catch(e => {
  //     throw e;
  //   })
  //   .finally(async () => {
  //     await prisma.$disconnect();
  //   });
}
export { OlxFinderController };
