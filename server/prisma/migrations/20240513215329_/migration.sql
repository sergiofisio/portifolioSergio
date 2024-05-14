/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `portifoliosBr` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `portifoliosEn` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `portifoliosFr` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "portifoliosBr_title_key" ON "portifoliosBr"("title");

-- CreateIndex
CREATE UNIQUE INDEX "portifoliosEn_title_key" ON "portifoliosEn"("title");

-- CreateIndex
CREATE UNIQUE INDEX "portifoliosFr_title_key" ON "portifoliosFr"("title");
