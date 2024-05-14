-- CreateTable
CREATE TABLE "commonFields" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "github" TEXT NOT NULL,

    CONSTRAINT "commonFields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portifoliosBr" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'pt',
    "commonFieldsId" INTEGER NOT NULL,

    CONSTRAINT "portifoliosBr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portifoliosFr" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'fr',
    "commonFieldsId" INTEGER NOT NULL,

    CONSTRAINT "portifoliosFr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portifoliosEn" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "commonFieldsId" INTEGER NOT NULL,

    CONSTRAINT "portifoliosEn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commonFields_url_key" ON "commonFields"("url");

-- AddForeignKey
ALTER TABLE "portifoliosBr" ADD CONSTRAINT "portifoliosBr_commonFieldsId_fkey" FOREIGN KEY ("commonFieldsId") REFERENCES "commonFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portifoliosFr" ADD CONSTRAINT "portifoliosFr_commonFieldsId_fkey" FOREIGN KEY ("commonFieldsId") REFERENCES "commonFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portifoliosEn" ADD CONSTRAINT "portifoliosEn_commonFieldsId_fkey" FOREIGN KEY ("commonFieldsId") REFERENCES "commonFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
