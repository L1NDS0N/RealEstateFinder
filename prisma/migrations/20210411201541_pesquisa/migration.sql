-- CreateTable
CREATE TABLE "Pesquisa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT,
    "cidade" TEXT,
    "tipo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
