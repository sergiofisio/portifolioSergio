type portifolioLanguage = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  language: string;
  commonFieldsId: number;
};

export type portifolioTypes = {
  id: number;
  titleId: string;
  github: string;
  url: string;
  image: string;
  portifolioBr: [portifolioLanguage];
  portifolioEn: [portifolioLanguage];
  portifolioFr: [portifolioLanguage];
};
