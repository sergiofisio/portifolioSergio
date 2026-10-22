import type { Locale } from "@/i18n/routing";

type Localized = Record<Locale, string>;

export type Post = {
  url: string;
  date: string;
  title: Localized;
  tags: string[];
};

const post = (slug: string) => `https://www.linkedin.com/posts/${slug}`;

export const reactSeries: { number: number; url: string; title: Localized }[] = [
  {
    number: 1,
    url: post("sergio-bastos-jr_fullstack-react-desenvolvimentodesistemas-activity-7488977390526980097-OELi"),
    title: { pt: "Por que o React mudou tudo", en: "Why React changed everything", fr: "Pourquoi React a tout changé" },
  },
  {
    number: 2,
    url: post("sergio-bastos-jr_fullstack-react-typescript-activity-7490124220413198336-BqMS"),
    title: { pt: "Componentes e JSX", en: "Components and JSX", fr: "Composants et JSX" },
  },
  {
    number: 3,
    url: post("sergio-bastos-jr_fullstack-react-typescript-activity-7490716470092558337-2lFF"),
    title: { pt: "Props", en: "Props", fr: "Props" },
  },
  {
    number: 4,
    url: post("sergio-bastos-jr_fullstack-react-typescript-activity-7491094430863556608-dIao"),
    title: { pt: "useState", en: "useState", fr: "useState" },
  },
  {
    number: 11,
    url: post("sergio-bastos-jr_fullstack-react-contextapi-activity-7495147467152388096-8om7"),
    title: { pt: "Context API e useReducer", en: "Context API and useReducer", fr: "Context API et useReducer" },
  },
  {
    number: 12,
    url: post("sergio-bastos-jr_fullstack-react-typescript-activity-7495509878174810112-9J4F"),
    title: { pt: "Custom hooks", en: "Custom hooks", fr: "Hooks personnalisés" },
  },
  {
    number: 13,
    url: post("sergio-bastos-jr_fullstack-react-typescript-activity-7495872272629616640-mnwo"),
    title: { pt: "Memoização", en: "Memoization", fr: "Mémoïsation" },
  },
  {
    number: 14,
    url: post("sergio-bastos-jr_fullstack-react-typescript-activity-7496234646414712832-2jqU"),
    title: { pt: "Estados de carregamento", en: "Loading states", fr: "États de chargement" },
  },
  {
    number: 15,
    url: post("sergio-bastos-jr_fullstack-react-nextjs-activity-7496596999807496193-KvoE"),
    title: { pt: "React Server Components", en: "React Server Components", fr: "React Server Components" },
  },
];

export const posts: Post[] = [
  {
    url: post("sergio-bastos-jr_frontend-nextjs-typescript-activity-7494737656510263296-k2-r"),
    date: "2026-08-16",
    title: {
      pt: "Game Boy emulado na web: 5 clássicos jogáveis com Next.js",
      en: "A Game Boy emulated on the web: 5 playable classics with Next.js",
      fr: "Une Game Boy émulée sur le web : 5 classiques jouables avec Next.js",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    url: post("sergio-bastos-jr_nextjs-react-typescript-activity-7370160623680311296-UyFy"),
    date: "2025-09-06",
    title: {
      pt: "Controle de Compras: arquitetura full stack com Next.js e multi-tenancy",
      en: "Shopping Tracker: full stack architecture with Next.js and multi-tenancy",
      fr: "Gestion des courses : architecture full stack avec Next.js et multi-tenancy",
    },
    tags: ["Next.js", "Prisma", "PostgreSQL"],
  },
  {
    url: post("sergio-bastos-jr_nodejs-jwt-seguran%C3%A7a-activity-7353101917247488001-K01e"),
    date: "2025-07-21",
    title: {
      pt: "Gere seu JWT_SECRET do jeito certo em Node.js",
      en: "Generate your JWT_SECRET the right way in Node.js",
      fr: "Générez votre JWT_SECRET correctement en Node.js",
    },
    tags: ["Node.js", "JWT", "crypto"],
  },
  {
    url: post("sergio-bastos-jr_nestjs-notion-activity-7287518614117605376-cujI"),
    date: "2025-01-21",
    title: {
      pt: "Atalhos essenciais do NestJS",
      en: "Essential NestJS shortcuts",
      fr: "Raccourcis essentiels de NestJS",
    },
    tags: ["NestJS", "Node.js"],
  },
];
