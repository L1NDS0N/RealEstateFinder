-- CreateTable
CREATE TABLE "ImoveisOlx" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "cidadeBairro" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "dataPublicacao" TEXT,
    "codPublicacao" TEXT,
    "cep" TEXT,
    "categoria" TEXT,
    "tipo" TEXT,
    "quartos" TEXT,
    "banheiros" TEXT,
    "vagasGaragem" TEXT,
    "areaConstruida" TEXT,
    "detalhesImovel" TEXT,
    "tetalhesCondominio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "anuncianteId" TEXT NOT NULL,
    FOREIGN KEY ("anuncianteId") REFERENCES "AnuncianteOlx" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnuncianteOlx" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
