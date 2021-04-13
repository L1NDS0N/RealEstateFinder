-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "href" TEXT,
    "pesquisaId" TEXT,
    FOREIGN KEY ("pesquisaId") REFERENCES "Pesquisa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
