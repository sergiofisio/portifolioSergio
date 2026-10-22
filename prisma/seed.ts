import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Prisma } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

type Locale = "pt" | "en" | "fr";
type Translation = { title: string; summary: string; content: string };

const icon = (id: string) => `https://skillicons.dev/icons?i=${id}`;

const technologies: Prisma.TechnologyCreateInput[] = [
  { name: "HTML", icon: icon("html"), category: "FRONTEND", order: 1 },
  { name: "CSS", icon: icon("css"), category: "FRONTEND", order: 2 },
  { name: "JavaScript", icon: icon("js"), category: "FRONTEND", order: 3 },
  { name: "TypeScript", icon: icon("ts"), category: "FRONTEND", order: 4 },
  { name: "React", icon: icon("react"), category: "FRONTEND", order: 5 },
  { name: "Next.js", icon: icon("nextjs"), category: "FRONTEND", order: 6 },
  { name: "Angular", icon: icon("angular"), category: "FRONTEND", order: 7 },
  { name: "Tailwind CSS", icon: icon("tailwind"), category: "FRONTEND", order: 8 },
  { name: "Node.js", icon: icon("nodejs"), category: "BACKEND", order: 1 },
  { name: "Express", icon: icon("express"), category: "BACKEND", order: 2 },
  { name: "Nest.js", icon: icon("nestjs"), category: "BACKEND", order: 3 },
  { name: "Prisma", icon: icon("prisma"), category: "BACKEND", order: 4 },
  { name: "Java", icon: icon("java"), category: "BACKEND", order: 5 },
  { name: "PostgreSQL", icon: icon("postgres"), category: "DATABASE", order: 1 },
  { name: "MySQL", icon: icon("mysql"), category: "DATABASE", order: 2 },
  { name: "Git", icon: icon("git"), category: "TOOLS", order: 1 },
  { name: "GitHub", icon: icon("github"), category: "TOOLS", order: 2 },
  { name: "Axios", category: "TOOLS", showInSkills: false },
  { name: "React Router", category: "FRONTEND", showInSkills: false },
  { name: "Knex", category: "BACKEND", showInSkills: false },
  { name: "JWT", category: "BACKEND", showInSkills: false },
  { name: "Swagger", category: "TOOLS", showInSkills: false },
  { name: "Yup", category: "FRONTEND", showInSkills: false },
  { name: "Joi", category: "BACKEND", showInSkills: false },
  { name: "React Native", icon: icon("react"), category: "FRONTEND", order: 9 },
  { name: "Expo", icon: "https://cdn.simpleicons.org/expo/ffffff", category: "FRONTEND", order: 10 },
  { name: "Redux", icon: icon("redux"), category: "FRONTEND", order: 11 },
  { name: "TypeORM", icon: "https://cdn.simpleicons.org/typeorm/FE0803", category: "BACKEND", order: 6 },
  { name: "Socket.IO", icon: "https://cdn.simpleicons.org/socketdotio/ffffff", category: "BACKEND", order: 7 },
  { name: "Supabase", icon: icon("supabase"), category: "DATABASE", order: 3 },
  { name: "Chrome Extensions", icon: "https://cdn.simpleicons.org/googlechrome", category: "TOOLS", order: 3 },
  { name: "Tesseract.js (OCR)", category: "TOOLS", showInSkills: false },
  { name: "Asaas", category: "BACKEND", showInSkills: false },
  { name: "Go", icon: icon("go"), category: "BACKEND", order: 8 },
  { name: "Spring Boot", icon: icon("spring"), category: "BACKEND", order: 9 },
  { name: "MongoDB", icon: icon("mongodb"), category: "DATABASE", order: 4 },
  { name: "Firebase", icon: icon("firebase"), category: "DATABASE", order: 5 },
  { name: "Docker", icon: icon("docker"), category: "TOOLS", order: 4 },
  { name: "Kubernetes", icon: icon("kubernetes"), category: "TOOLS", order: 5 },
  { name: "AWS", icon: icon("aws"), category: "TOOLS", order: 6 },
  { name: "Vite", icon: icon("vite"), category: "TOOLS", showInSkills: false },
  { name: "Jest", icon: icon("jest"), category: "TOOLS", showInSkills: false },
  { name: "Material UI", icon: icon("materialui"), category: "FRONTEND", showInSkills: false },
  { name: "Styled Components", icon: icon("styledcomponents"), category: "FRONTEND", showInSkills: false },
  { name: "Drizzle ORM", icon: "https://cdn.simpleicons.org/drizzle/C5F74F", category: "BACKEND", showInSkills: false },
  { name: "Auth.js", category: "BACKEND", showInSkills: false },
  { name: "Zustand", category: "FRONTEND", showInSkills: false },
  { name: "Phaser", category: "FRONTEND", showInSkills: false },
];

const features: Record<Locale, string> = {
  pt: "Principais funcionalidades",
  en: "Main features",
  fr: "Fonctionnalités principales",
};

function content(locale: Locale, intro: string[], items: string[]) {
  return `${intro.join("\n\n")}\n\n## ${features[locale]}\n\n${items
    .map((item) => `- ${item}`)
    .join("\n")}`;
}

type SeedProject = Omit<Prisma.ProjectCreateInput, "technologies" | "translations"> & {
  technologies: string[];
  translations: Record<Locale, Translation>;
};

const projects: SeedProject[] = [
  {
    slug: "cuboflix",
    githubUrl: "https://github.com/sergiofisio/cuboflix",
    siteUrl: "https://cuboflix.vercel.app/",
    coverImage: "/projects/cuboflix.webp",
    images: ["/projects/cuboflix.webp"],
    order: 3,
    technologies: ["HTML", "CSS", "JavaScript", "Axios"],
    translations: {
      pt: {
        title: "CuboFlix",
        summary:
          "Plataforma de streaming inspirada na Netflix, consumindo uma API de filmes com busca, destaque do dia e modo claro/escuro.",
        content: content(
          "pt",
          [
            "Projeto desenvolvido durante o curso de desenvolvimento de software da Cubos Academy.",
            "O desafio era criar um site chamado CuboFlix, inspirado em plataformas de streaming populares. A aplicação consome dados de uma API para exibir informações sobre filmes e permite diversas interações.",
          ],
          [
            "Exibição de uma lista de filmes disponíveis na API",
            "Pesquisa de filmes por nome para encontrar títulos rapidamente",
            "Destaque do dia, onde um filme aleatório ganha destaque na página inicial",
            "Modal de detalhes do filme, com informações adicionais sobre o título selecionado",
            "Modo claro e escuro com persistência após atualização da página",
          ],
        ),
      },
      en: {
        title: "CuboFlix",
        summary:
          "Netflix-inspired streaming platform consuming a movie API, with search, daily highlight and light/dark mode.",
        content: content(
          "en",
          [
            "Project developed during the software development course at Cubos Academy.",
            "The challenge was to create a website called CuboFlix, inspired by popular streaming platforms. The application consumes data from an API to display information about movies and allows various interactions.",
          ],
          [
            "Display of a list of movies available in the API",
            "Movie search by name to quickly find titles",
            "Highlight of the day, where a random movie is featured on the homepage",
            "Movie details modal with additional information about the selected title",
            "Light and dark mode with persistence after page refresh",
          ],
        ),
      },
      fr: {
        title: "CuboFlix",
        summary:
          "Plateforme de streaming inspirée de Netflix, consommant une API de films avec recherche, film du jour et mode clair/sombre.",
        content: content(
          "fr",
          [
            "Projet développé lors du cours de développement logiciel à la Cubos Academy.",
            "Le défi était de créer un site web appelé CuboFlix, inspiré des plateformes de streaming populaires. L'application consomme des données d'une API pour afficher des informations sur les films et permet diverses interactions.",
          ],
          [
            "Affichage d'une liste de films disponibles dans l'API",
            "Recherche de films par nom pour trouver rapidement des titres",
            "Mise en avant du jour, où un film aléatoire est mis en avant sur la page d'accueil",
            "Modal avec détails du film et informations supplémentaires sur le titre sélectionné",
            "Mode clair et sombre avec persistance après actualisation de la page",
          ],
        ),
      },
    },
  },
  {
    slug: "aplicacao-cobrancas",
    githubUrl: "https://github.com/sergiofisio/aplicacaoCobranca",
    siteUrl: "https://app-cobranca.vercel.app/",
    coverImage: "/projects/cobranca.webp",
    images: ["/projects/cobranca.webp"],
    order: 2,
    featured: true,
    technologies: [
      "React",
      "React Router",
      "Yup",
      "Axios",
      "Node.js",
      "Express",
      "Knex",
      "PostgreSQL",
      "Swagger",
      "Joi",
      "JWT",
    ],
    translations: {
      pt: {
        title: "Aplicação de Cobrança",
        summary:
          "Sistema full stack para gestão de clientes e cobranças, com autenticação, controle de pagamentos e API documentada.",
        content: content(
          "pt",
          [
            "Aplicação desenvolvida para facilitar a gestão de cobranças e clientes, criada para pequenas empresas e autônomos que precisam organizar seus recebimentos e manter o controle financeiro.",
            "A plataforma permite cadastrar clientes, gerenciar cobranças e acompanhar o status de cada pagamento.",
          ],
          [
            "Cadastro e login de usuários para acesso seguro",
            "Registro e listagem de clientes, com detalhes de contato e histórico de cobranças",
            "Geração e gerenciamento de cobranças, incluindo prazos e valores",
            "Edição e exclusão de cobranças conforme necessidade",
            "Visualização detalhada de pagamentos e status de cada cobrança",
          ],
        ),
      },
      en: {
        title: "Billing Application",
        summary:
          "Full stack system for managing customers and invoices, with authentication, payment tracking and a documented API.",
        content: content(
          "en",
          [
            "Application developed to facilitate billing and customer management, created for small businesses and freelancers who need to organize their collections and maintain financial control.",
            "The platform allows registering clients, managing bills, and tracking the status of each payment.",
          ],
          [
            "User registration and login for secure access",
            "Customer registration and listing, with contact details and billing history",
            "Creation and management of invoices, including due dates and amounts",
            "Editing and deleting invoices as needed",
            "Detailed view of payments and the status of each invoice",
          ],
        ),
      },
      fr: {
        title: "Application de Facturation",
        summary:
          "Système full stack de gestion des clients et des factures, avec authentification, suivi des paiements et API documentée.",
        content: content(
          "fr",
          [
            "Application développée pour faciliter la gestion des factures et des clients, créée pour les petites entreprises et les indépendants ayant besoin d'organiser leurs encaissements et de maintenir un contrôle financier.",
            "La plateforme permet d'enregistrer des clients, de gérer les factures et de suivre l'état de chaque paiement.",
          ],
          [
            "Inscription et connexion des utilisateurs pour un accès sécurisé",
            "Enregistrement et listing des clients, avec détails de contact et historique des facturations",
            "Création et gestion des factures, y compris les délais et montants",
            "Modification et suppression des factures selon les besoins",
            "Vue détaillée des paiements et du statut de chaque facture",
          ],
        ),
      },
    },
  },
  {
    slug: "pokedex",
    githubUrl: "https://github.com/sergiofisio/pokedexNew",
    siteUrl: "https://pokedex-new-xi.vercel.app/",
    coverImage: "/projects/pokedex.webp",
    images: ["/projects/pokedex.webp"],
    order: 4,
    technologies: ["Angular", "TypeScript", "Tailwind CSS"],
    translations: {
      pt: {
        title: "PokeDex",
        summary:
          "Pokédex em Angular consumindo a PokeAPI, com busca por nome e página de detalhes com habilidades e estatísticas.",
        content: content(
          "pt",
          [
            "Projeto desenvolvido para explorar conceitos de desenvolvimento web com Angular.",
            "Inspirado na famosa Pokédex, essa aplicação permite buscar e visualizar informações sobre diferentes Pokémon, consumindo a API pública PokeAPI.",
          ],
          [
            "Listagem completa de Pokémon disponíveis na API",
            "Pesquisa rápida por nome para encontrar Pokémon específicos",
            "Visualização detalhada com imagem, habilidades e estatísticas",
            "Interface responsiva e estilizada com Tailwind CSS",
          ],
        ),
      },
      en: {
        title: "PokeDex",
        summary:
          "Angular Pokédex consuming PokeAPI, with name search and a details page showing abilities and stats.",
        content: content(
          "en",
          [
            "Project developed to explore web development concepts with Angular.",
            "Inspired by the famous Pokédex, this application allows searching and viewing information about different Pokémon, consuming the public PokeAPI.",
          ],
          [
            "Complete listing of Pokémon available in the API",
            "Quick search by name to find specific Pokémon",
            "Detailed view with image, abilities, and stats",
            "Responsive and stylish interface using Tailwind CSS",
          ],
        ),
      },
      fr: {
        title: "PokeDex",
        summary:
          "Pokédex en Angular consommant la PokeAPI, avec recherche par nom et page de détails avec compétences et statistiques.",
        content: content(
          "fr",
          [
            "Projet développé pour explorer les concepts de développement web avec Angular.",
            "Inspirée de la célèbre Pokédex, cette application permet de rechercher et d'afficher des informations sur différents Pokémon, en consommant l'API publique PokeAPI.",
          ],
          [
            "Liste complète des Pokémon disponibles dans l'API",
            "Recherche rapide par nom pour trouver un Pokémon spécifique",
            "Vue détaillée avec image, compétences et statistiques",
            "Interface réactive et stylisée avec Tailwind CSS",
          ],
        ),
      },
    },
  },
  {
    slug: "clinica-biointegral-saude",
    githubUrl: "https://github.com/sergiofisio/biointegralNext",
    siteUrl: "https://biointegralsaude.com.br/",
    coverImage: "/projects/biointegral-1.webp",
    images: [
      "/projects/biointegral-1.webp",
      "/projects/biointegral-2.webp",
      "/projects/biointegral-3.webp",
      "/projects/biointegral-4.webp",
    ],
    order: 1,
    featured: true,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Axios"],
    translations: {
      pt: {
        title: "Clínica Biointegral Saúde",
        summary:
          "Site institucional em produção da Clínica Biointegral Saúde, construído com Next.js para performance e SEO.",
        content: content(
          "pt",
          [
            "Projeto de criação do site oficial da Clínica Biointegral Saúde, desenvolvido para apresentar a clínica, seus serviços e profissionais ao público de maneira acessível e intuitiva.",
            "O site foi criado utilizando o framework Next.js para melhor performance e SEO.",
          ],
          [
            "Exibição detalhada dos serviços oferecidos pela clínica",
            "Apresentação da equipe de profissionais e suas especialidades",
            "Formulário de contato para agendamento e dúvidas",
          ],
        ),
      },
      en: {
        title: "Biointegral Saúde Clinic",
        summary:
          "Production website for the Biointegral Saúde Clinic, built with Next.js for performance and SEO.",
        content: content(
          "en",
          [
            "Project for creating the official website of the Biointegral Saúde Clinic, developed to present the clinic, its services, and professionals to the public in an accessible and intuitive way.",
            "The website was created using the Next.js framework for better performance and SEO.",
          ],
          [
            "Detailed display of the services offered by the clinic",
            "Presentation of the professional team and their specialties",
            "Contact form for scheduling and inquiries",
          ],
        ),
      },
      fr: {
        title: "Clinique Biointegral Santé",
        summary:
          "Site officiel en production de la Clinique Biointegral Santé, construit avec Next.js pour la performance et le SEO.",
        content: content(
          "fr",
          [
            "Projet de création du site officiel de la Clinique Biointegral Santé, développé pour présenter la clinique, ses services et ses professionnels au public de manière accessible et intuitive.",
            "Le site a été créé en utilisant le framework Next.js pour de meilleures performances et un meilleur référencement SEO.",
          ],
          [
            "Affichage détaillé des services offerts par la clinique",
            "Présentation de l'équipe de professionnels et de leurs spécialités",
            "Formulaire de contact pour la prise de rendez-vous et les demandes de renseignements",
          ],
        ),
      },
    },
  },
  {
    slug: "meditacoes-diarias",
    coverImage: "/projects/meditacoes-diarias.webp",
    images: ["/projects/meditacoes-diarias.webp", "/projects/meditacoes-diarias-livro.webp"],
    order: 5,
    featured: true,
    technologies: ["React Native", "Expo", "TypeScript", "Supabase", "Next.js", "Asaas"],
    translations: {
      pt: {
        title: "Meditações Diárias",
        summary:
          "App iOS e Android que transforma o livro Meditações Diárias em uma prática guiada por dia, com diário, mandalas para colorir e assinatura premium.",
        content: content(
          "pt",
          [
            "Aplicativo mobile baseado no livro *Meditações Diárias*, que escrevi com Frésia Jorge de Sá Bastos. Cada dia traz uma prática completa: check-in corporal, respiração, reflexão, exercício e registro no diário, com foco em constância e sem culpa quando um dia é perdido.",
            "Construído com React Native e Expo (Expo Router), Supabase como backend (autenticação, banco e Edge Functions) e um painel administrativo em Next.js. Projeto em desenvolvimento.",
          ],
          [
            "Onboarding com propósito, lembrete diário e check-in inicial",
            "Prática diária guiada com resumo de cada dia",
            "Diário pessoal privado e acompanhamento da jornada",
            "Mandalas para colorir desenhadas com React Native Skia",
            "Biblioteca com favoritos e conteúdo disponível offline",
            "Assinatura premium via App Store, Google Play e Asaas, validada no servidor",
            "Painel web para gestão de usuários, testers e financeiro",
          ],
        ),
      },
      en: {
        title: "Daily Meditations",
        summary:
          "iOS and Android app that turns the book Meditações Diárias into one guided practice per day, with a journal, coloring mandalas and a premium subscription.",
        content: content(
          "en",
          [
            "Mobile app based on the book *Meditações Diárias* (Daily Meditations), which I co-wrote with Frésia Jorge de Sá Bastos. Each day offers a complete practice: body check-in, breathing, reflection, an exercise and a journal entry, focused on consistency with no guilt when a day is missed.",
            "Built with React Native and Expo (Expo Router), Supabase as the backend (auth, database and Edge Functions) and an admin dashboard in Next.js. Work in progress.",
          ],
          [
            "Onboarding with purpose, daily reminder and initial check-in",
            "Guided daily practice with a summary of each day",
            "Private personal journal and progress journey",
            "Coloring mandalas drawn with React Native Skia",
            "Library with favorites and offline content",
            "Premium subscription through the App Store, Google Play and Asaas, validated server-side",
            "Web dashboard to manage users, testers and billing",
          ],
        ),
      },
      fr: {
        title: "Méditations Quotidiennes",
        summary:
          "Application iOS et Android qui transforme le livre Meditações Diárias en une pratique guidée par jour, avec journal, mandalas à colorier et abonnement premium.",
        content: content(
          "fr",
          [
            "Application mobile basée sur le livre *Meditações Diárias* (Méditations quotidiennes), que j'ai coécrit avec Frésia Jorge de Sá Bastos. Chaque jour propose une pratique complète : check-in corporel, respiration, réflexion, exercice et journal, avec un accent sur la régularité, sans culpabilité lorsqu'un jour est manqué.",
            "Développée avec React Native et Expo (Expo Router), Supabase comme backend (authentification, base de données et Edge Functions) et un tableau de bord d'administration en Next.js. Projet en cours de développement.",
          ],
          [
            "Onboarding avec objectif, rappel quotidien et check-in initial",
            "Pratique quotidienne guidée avec résumé de chaque jour",
            "Journal personnel privé et suivi du parcours",
            "Mandalas à colorier dessinés avec React Native Skia",
            "Bibliothèque avec favoris et contenu disponible hors ligne",
            "Abonnement premium via l'App Store, Google Play et Asaas, validé côté serveur",
            "Tableau de bord web pour gérer utilisateurs, testeurs et facturation",
          ],
        ),
      },
    },
  },
  {
    slug: "controle-de-compras-familiar",
    githubUrl: "https://github.com/sergiofisio/controle_compras",
    siteUrl: "https://controle-compras-ten.vercel.app",
    coverImage: "/projects/controle-compras.webp",
    images: [
      "/projects/controle-compras.webp",
      "/projects/controle-compras-home.webp",
      "/projects/controle-compras-login.webp",
      "/projects/controle-compras-register.webp",
    ],
    order: 6,
    featured: true,
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Redux",
      "Tailwind CSS",
      "TypeORM",
      "PostgreSQL",
      "Socket.IO",
      "Tesseract.js (OCR)",
      "JWT",
    ],
    translations: {
      pt: {
        title: "Controle de Compras Familiar",
        summary:
          "Aplicação full stack para a família organizar compras: listas compartilhadas em tempo real, histórico de preços e cadastro de produtos por foto com OCR.",
        content: content(
          "pt",
          [
            "Aplicação web para controle de compras domésticas, pensada para ser usada pela família inteira ao mesmo tempo.",
            "Construída com Next.js e TypeORM sobre PostgreSQL, com atualização em tempo real via WebSocket (Socket.IO) e leitura de rótulos por OCR (Tesseract.js) direto no navegador.",
          ],
          [
            "Cadastro, login com e-mail e senha e recuperação de senha",
            "Famílias com código de convite e listas de compras compartilhadas",
            "Listas atualizadas em tempo real para todos os membros",
            "Registro de compras por loja, com histórico e variação de preços em gráficos",
            "OCR local de fotos para sugerir o cadastro de produtos",
            "Painel administrativo com usuários, logs de acesso e métricas",
            "Interface em vários idiomas",
          ],
        ),
      },
      en: {
        title: "Family Shopping Tracker",
        summary:
          "Full stack app for families to organize their shopping: real-time shared lists, price history and product registration from photos with OCR.",
        content: content(
          "en",
          [
            "Web application to manage household shopping, designed to be used by the whole family at the same time.",
            "Built with Next.js and TypeORM on PostgreSQL, with real-time updates over WebSocket (Socket.IO) and in-browser label reading with OCR (Tesseract.js).",
          ],
          [
            "Sign-up, email and password login and password recovery",
            "Families with invite codes and shared shopping lists",
            "Lists updated in real time for every member",
            "Purchases recorded per store, with price history and variation charts",
            "Local OCR on photos to suggest new product entries",
            "Admin dashboard with users, access logs and metrics",
            "Multilingual interface",
          ],
        ),
      },
      fr: {
        title: "Gestion des Courses Familiales",
        summary:
          "Application full stack pour organiser les courses en famille : listes partagées en temps réel, historique des prix et ajout de produits par photo avec OCR.",
        content: content(
          "fr",
          [
            "Application web de gestion des courses du foyer, conçue pour être utilisée par toute la famille en même temps.",
            "Développée avec Next.js et TypeORM sur PostgreSQL, avec mises à jour en temps réel via WebSocket (Socket.IO) et lecture d'étiquettes par OCR (Tesseract.js) directement dans le navigateur.",
          ],
          [
            "Inscription, connexion par e-mail et mot de passe et récupération du mot de passe",
            "Familles avec code d'invitation et listes de courses partagées",
            "Listes mises à jour en temps réel pour tous les membres",
            "Achats enregistrés par magasin, avec historique et graphiques de variation des prix",
            "OCR local sur les photos pour suggérer l'ajout de produits",
            "Tableau de bord d'administration avec utilisateurs, journaux d'accès et métriques",
            "Interface multilingue",
          ],
        ),
      },
    },
  },
  {
    slug: "biointegral-mensagens-whatsapp",
    coverImage: "/projects/biointegral-whatsapp.webp",
    images: ["/projects/biointegral-whatsapp.webp"],
    order: 7,
    technologies: ["Chrome Extensions", "JavaScript", "HTML", "CSS", "Supabase"],
    translations: {
      pt: {
        title: "Biointegral — Mensagens WhatsApp",
        summary:
          "Extensão para Chrome, Edge e Firefox que adiciona ao WhatsApp Web um painel de mensagens prontas, com variáveis e envio em um clique.",
        content: content(
          "pt",
          [
            "Extensão de navegador criada para a equipe da Clínica Biointegral Saúde agilizar o atendimento pelo WhatsApp Web.",
            "Um botão flutuante abre um painel com mensagens pré-cadastradas. O atendente escolhe o modelo, preenche data, horário, profissional e local, e insere o texto no chat ou envia direto, mantendo a formatação nativa do WhatsApp.",
          ],
          [
            "Painel flutuante integrado ao WhatsApp Web",
            "Variáveis dinâmicas: `{{nome}}`, `{{data}}`, `{{hora}}`, `{{profissional}}` e `{{local}}`",
            "Seleção de data, horário, profissional e endereço antes do envio",
            "Cadastro, edição e exclusão de mensagens com formatação do WhatsApp (*negrito*, _itálico_, ~riscado~)",
            "Sincronização opcional das mensagens via Supabase",
            "Distribuição pela Chrome Web Store, versão para Firefox e instaladores para Windows e Mac",
          ],
        ),
      },
      en: {
        title: "Biointegral — WhatsApp Templates",
        summary:
          "Chrome, Edge and Firefox extension that adds a panel of ready-made messages to WhatsApp Web, with variables and one-click sending.",
        content: content(
          "en",
          [
            "Browser extension built for the Biointegral Saúde Clinic team to speed up patient communication on WhatsApp Web.",
            "A floating button opens a panel with saved message templates. The attendant picks a template, fills in date, time, professional and location, then inserts the text into the chat or sends it right away, keeping WhatsApp's native formatting.",
          ],
          [
            "Floating panel integrated into WhatsApp Web",
            "Dynamic variables: `{{nome}}`, `{{data}}`, `{{hora}}`, `{{profissional}}` and `{{local}}`",
            "Date, time, professional and address selection before sending",
            "Create, edit and delete templates with WhatsApp formatting (*bold*, _italic_, ~strikethrough~)",
            "Optional template sync through Supabase",
            "Distributed through the Chrome Web Store, with a Firefox build and installers for Windows and Mac",
          ],
        ),
      },
      fr: {
        title: "Biointegral — Modèles WhatsApp",
        summary:
          "Extension Chrome, Edge et Firefox qui ajoute à WhatsApp Web un panneau de messages prêts à l'emploi, avec variables et envoi en un clic.",
        content: content(
          "fr",
          [
            "Extension de navigateur créée pour l'équipe de la Clinique Biointegral Santé afin d'accélérer les échanges avec les patients sur WhatsApp Web.",
            "Un bouton flottant ouvre un panneau de modèles enregistrés. L'opérateur choisit un modèle, renseigne la date, l'heure, le professionnel et le lieu, puis insère le texte dans la conversation ou l'envoie directement, en conservant la mise en forme native de WhatsApp.",
          ],
          [
            "Panneau flottant intégré à WhatsApp Web",
            "Variables dynamiques : `{{nome}}`, `{{data}}`, `{{hora}}`, `{{profissional}}` et `{{local}}`",
            "Choix de la date, de l'heure, du professionnel et de l'adresse avant l'envoi",
            "Création, modification et suppression de modèles avec la mise en forme WhatsApp (*gras*, _italique_, ~barré~)",
            "Synchronisation optionnelle des modèles via Supabase",
            "Distribution via le Chrome Web Store, version Firefox et installateurs pour Windows et Mac",
          ],
        ),
      },
    },
  },
  {
    slug: "nimu-doces",
    coverImage: "/projects/nimu-doces.webp",
    images: [
      "/projects/nimu-doces-inicio.webp",
      "/projects/nimu-doces-cardapio.webp",
      "/projects/nimu-doces-sobre.webp",
      "/projects/nimu-doces-pedido.webp",
    ],
    order: 8,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    translations: {
      pt: {
        title: "NIMU Doces & Companhia",
        summary:
          "Site para uma confeitaria artesanal, com cardápio por categoria, depoimentos e pedidos pelo WhatsApp. Em desenvolvimento.",
        content: content(
          "pt",
          [
            "Site institucional da NIMU Doces & Companhia, confeitaria artesanal de cookies, bolos decorados e doces.",
            "O layout foi desenhado primeiro (as imagens da galeria são do protótipo) e está sendo implementado com Next.js 16, React 19 e Tailwind CSS.",
          ],
          [
            "Página inicial com chamadas para o cardápio e para encomendas",
            "Cardápio filtrado por categoria: doces, cookies e bolos",
            "Seção \"Sobre\" com a história da marca e seus números",
            "Depoimentos de clientes",
            "Formulário de pedido e atalho direto para o WhatsApp",
          ],
        ),
      },
      en: {
        title: "NIMU Doces & Companhia",
        summary:
          "Website for an artisan bakery, with a menu by category, testimonials and orders via WhatsApp. Work in progress.",
        content: content(
          "en",
          [
            "Website for NIMU Doces & Companhia, an artisan bakery making cookies, decorated cakes and sweets.",
            "The layout was designed first (the gallery images come from the prototype) and is being built with Next.js 16, React 19 and Tailwind CSS.",
          ],
          [
            "Home page with calls to action for the menu and orders",
            "Menu filtered by category: sweets, cookies and cakes",
            "\"About\" section with the brand's story and numbers",
            "Customer testimonials",
            "Order form and a direct WhatsApp shortcut",
          ],
        ),
      },
      fr: {
        title: "NIMU Doces & Companhia",
        summary:
          "Site pour une pâtisserie artisanale, avec carte par catégorie, témoignages et commandes via WhatsApp. En cours de développement.",
        content: content(
          "fr",
          [
            "Site de NIMU Doces & Companhia, pâtisserie artisanale de cookies, gâteaux décorés et douceurs.",
            "La maquette a été conçue en premier (les images de la galerie viennent du prototype) et le site est développé avec Next.js 16, React 19 et Tailwind CSS.",
          ],
          [
            "Page d'accueil avec accès à la carte et aux commandes",
            "Carte filtrée par catégorie : douceurs, cookies et gâteaux",
            "Section « À propos » avec l'histoire de la marque et ses chiffres",
            "Témoignages de clients",
            "Formulaire de commande et raccourci direct vers WhatsApp",
          ],
        ),
      },
    },
  },
  {
    slug: "taverna-dos-jogos",
    githubUrl: "https://github.com/sergiofisio/taverna-games",
    siteUrl: "https://tavernadosjogos.com.br",
    coverImage: "/projects/taverna-dos-jogos.webp",
    images: [
      "/projects/taverna-dos-jogos.webp",
      "/projects/taverna-dos-jogos-pokedex.webp",
      "/projects/taverna-dos-jogos-desafios.webp",
    ],
    order: 1,
    featured: true,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Axios"],
    translations: {
      pt: {
        title: "Taverna dos Jogos",
        summary:
          "Portal gratuito para fãs de games: Pokédex completa, cartas de Hearthstone, Yu-Gi-Oh! e TCG Pocket, LoL e animes, com desafios diários, duelos ao vivo e progressão por conta.",
        content: content(
          "pt",
          [
            "A Taverna dos Jogos começou como uma Pokédex e virou um portal com vários \"mundos\": Pokémon, Hearthstone, League of Legends, animes, Pokémon TCG Pocket e Yu-Gi-Oh!, cada um com sua biblioteca e um desafio diário no estilo Wordle.",
            "Construída com Next.js 16, React 19, Tailwind CSS 4 e Motion, com Supabase (Auth, Postgres com RLS, Storage e Realtime) para contas, progresso e duelos ao vivo.",
          ],
          [
            "Pokédex com os 1025 Pokémon, cadeia evolutiva por geração, formas regionais, sprites e gritos",
            "Sete modos de desafio (silhueta, descrição, zoom, som, fusão, ginásio e infinito) e desafio diário",
            "Duelos entre treinadores por link ou ao vivo, com Supabase Realtime",
            "Bibliotecas de cartas e montadores de deck de Hearthstone, Yu-Gi-Oh! e TCG Pocket, com simulador de pacotes",
            "XP, níveis, insígnias e perfil público, com login por Google, GitHub ou e-mail",
            "Interface em português e inglês, com tema claro e escuro",
          ],
        ),
      },
      en: {
        title: "Taverna dos Jogos",
        summary:
          "Free hub for gamers: a complete Pokédex, Hearthstone, Yu-Gi-Oh! and TCG Pocket cards, LoL and anime, with daily challenges, live duels and account progression.",
        content: content(
          "en",
          [
            "Taverna dos Jogos (\"the Games Tavern\") started as a Pokédex and grew into a hub with several \"worlds\": Pokémon, Hearthstone, League of Legends, anime, Pokémon TCG Pocket and Yu-Gi-Oh!, each with its own library and a Wordle-style daily challenge.",
            "Built with Next.js 16, React 19, Tailwind CSS 4 and Motion, with Supabase (Auth, Postgres with RLS, Storage and Realtime) for accounts, progress and live duels.",
          ],
          [
            "Pokédex with all 1025 Pokémon, per-generation evolution chains, regional forms, sprites and cries",
            "Seven challenge modes (silhouette, description, zoom, sound, fusion, gym and endless) plus a daily challenge",
            "Trainer duels by link or live, powered by Supabase Realtime",
            "Card libraries and deck builders for Hearthstone, Yu-Gi-Oh! and TCG Pocket, with a pack simulator",
            "XP, levels, badges and public profiles, with Google, GitHub or email login",
            "Portuguese and English interface, with light and dark themes",
          ],
        ),
      },
      fr: {
        title: "Taverna dos Jogos",
        summary:
          "Portail gratuit pour les joueurs : Pokédex complet, cartes Hearthstone, Yu-Gi-Oh! et TCG Pocket, LoL et animés, avec défis quotidiens, duels en direct et progression par compte.",
        content: content(
          "fr",
          [
            "Taverna dos Jogos (« la Taverne des jeux ») a commencé comme un Pokédex et est devenue un portail avec plusieurs « mondes » : Pokémon, Hearthstone, League of Legends, animés, Pokémon TCG Pocket et Yu-Gi-Oh!, chacun avec sa bibliothèque et un défi quotidien façon Wordle.",
            "Développé avec Next.js 16, React 19, Tailwind CSS 4 et Motion, avec Supabase (Auth, Postgres avec RLS, Storage et Realtime) pour les comptes, la progression et les duels en direct.",
          ],
          [
            "Pokédex avec les 1025 Pokémon, chaînes d'évolution par génération, formes régionales, sprites et cris",
            "Sept modes de défi (silhouette, description, zoom, son, fusion, arène et infini) et un défi quotidien",
            "Duels entre dresseurs par lien ou en direct, avec Supabase Realtime",
            "Bibliothèques de cartes et créateurs de decks pour Hearthstone, Yu-Gi-Oh! et TCG Pocket, avec simulateur de boosters",
            "XP, niveaux, badges et profil public, avec connexion Google, GitHub ou e-mail",
            "Interface en portugais et en anglais, avec thèmes clair et sombre",
          ],
        ),
      },
    },
  },
  {
    slug: "retro-room",
    githubUrl: "https://github.com/sergiofisio/gameboy",
    siteUrl: "https://gameboy-three-snowy.vercel.app",
    coverImage: "/projects/retro-room.webp",
    images: ["/projects/retro-room.webp", "/projects/retro-room-consoles.webp"],
    order: 2,
    featured: true,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Auth.js", "Supabase", "MongoDB"],
    translations: {
      pt: {
        title: "Retro Room",
        summary:
          "Sala de consoles clássicos na web: Game Boy e Master System recriados em componentes, com emulação real, troca de cartuchos e saves na nuvem.",
        content: content(
          "pt",
          [
            "Começou como um Game Boy (DMG) montado só com componentes React e evoluiu para o Retro Room, uma sala com consoles clássicos que rodam jogos de verdade no navegador, como Pokémon Red, Tetris, Super Mario Land, Zelda e Metroid.",
            "Next.js 16, TypeScript e Tailwind CSS no frontend, Auth.js para login, Drizzle e PostgreSQL para jogos e saves, Supabase Storage para capas e ROMs e MongoDB para os logs do painel administrativo.",
          ],
          [
            "Consoles detalhados em componentes, em escala máxima mantendo a proporção original",
            "Emulação real, com troca de cartucho apenas com o console desligado",
            "Saves da SRAM na nuvem, com login Google e sessão de 24 horas",
            "ROMs entregues por proxy assinado, com caminho criptografado (AES-256-GCM) e storage privado",
            "Painel administrativo com cadastro de jogos, auditoria e logs",
            "Rate limit, verificação de Origin e headers de segurança (CSP, COOP/COEP)",
          ],
        ),
      },
      en: {
        title: "Retro Room",
        summary:
          "A room of classic consoles on the web: Game Boy and Master System rebuilt as components, with real emulation, cartridge swapping and cloud saves.",
        content: content(
          "en",
          [
            "It started as a Game Boy (DMG) built only with React components and grew into Retro Room, a room of classic consoles that run real games in the browser, such as Pokémon Red, Tetris, Super Mario Land, Zelda and Metroid.",
            "Next.js 16, TypeScript and Tailwind CSS on the frontend, Auth.js for login, Drizzle and PostgreSQL for games and saves, Supabase Storage for covers and ROMs, and MongoDB for the admin dashboard logs.",
          ],
          [
            "Detailed consoles built as components, scaled to fit while keeping the original proportions",
            "Real emulation, with cartridges swapped only while the console is off",
            "SRAM saves in the cloud, with Google login and 24-hour sessions",
            "ROMs served through a signed proxy, with encrypted paths (AES-256-GCM) and private storage",
            "Admin dashboard with game management, auditing and logs",
            "Rate limiting, Origin checks and security headers (CSP, COOP/COEP)",
          ],
        ),
      },
      fr: {
        title: "Retro Room",
        summary:
          "Une salle de consoles rétro sur le web : Game Boy et Master System recréées en composants, avec vraie émulation, changement de cartouches et sauvegardes dans le cloud.",
        content: content(
          "fr",
          [
            "Le projet a commencé comme une Game Boy (DMG) construite uniquement avec des composants React, puis est devenu Retro Room, une salle de consoles rétro qui font tourner de vrais jeux dans le navigateur, comme Pokémon Rouge, Tetris, Super Mario Land, Zelda et Metroid.",
            "Next.js 16, TypeScript et Tailwind CSS côté frontend, Auth.js pour la connexion, Drizzle et PostgreSQL pour les jeux et les sauvegardes, Supabase Storage pour les jaquettes et les ROMs, et MongoDB pour les journaux du tableau d'administration.",
          ],
          [
            "Consoles détaillées en composants, à l'échelle maximale tout en gardant les proportions d'origine",
            "Vraie émulation, avec changement de cartouche uniquement console éteinte",
            "Sauvegardes SRAM dans le cloud, avec connexion Google et session de 24 heures",
            "ROMs servies par un proxy signé, avec chemin chiffré (AES-256-GCM) et stockage privé",
            "Tableau d'administration avec gestion des jeux, audit et journaux",
            "Limitation de débit, vérification d'Origin et en-têtes de sécurité (CSP, COOP/COEP)",
          ],
        ),
      },
    },
  },
  {
    slug: "station-to-station",
    githubUrl: "https://github.com/sergiofisio/side-scroll-game",
    siteUrl: "https://sergiofisio.github.io/side-scroll-game/",
    coverImage: "/projects/station-to-station-gameplay.webp",
    images: ["/projects/station-to-station.webp", "/projects/station-to-station-gameplay.webp"],
    order: 9,
    technologies: ["Phaser", "JavaScript", "Vite"],
    translations: {
      pt: {
        title: "Station to Station",
        summary: "Beat 'em up de rolagem lateral jogável no navegador: limpe o último trem da noite, vagão a vagão.",
        content: content(
          "pt",
          [
            "Demo de um jogo beat 'em up em que o jogador atravessa o último trem da noite, enfrentando inimigos vagão a vagão.",
            "Desenvolvido com o framework Phaser, renderizado em canvas e publicado no GitHub Pages.",
          ],
          [
            "Vagões com cenários próprios e progressão até o fim da linha",
            "Socos, agarrões, arremessos e armas para pegar no cenário",
            "Barra de vida e pontuação",
            "Controles pelo teclado: WASD ou setas para mover, J para socar, K para agarrar e L para pegar armas",
            "Roda direto no navegador, sem instalação",
          ],
        ),
      },
      en: {
        title: "Station to Station",
        summary: "Side-scrolling beat 'em up playable in the browser: clear the last train of the night, car by car.",
        content: content(
          "en",
          [
            "Demo of a beat 'em up game where the player fights through the last train of the night, car by car.",
            "Built with the Phaser framework, rendered on canvas and published on GitHub Pages.",
          ],
          [
            "Train cars with their own scenery and progression to the end of the line",
            "Punches, grabs, throws and weapons to pick up",
            "Health bar and score",
            "Keyboard controls: WASD or arrows to move, J to punch, K to grab and L to pick up weapons",
            "Runs right in the browser, no install needed",
          ],
        ),
      },
      fr: {
        title: "Station to Station",
        summary: "Beat 'em up à défilement horizontal jouable dans le navigateur : nettoyez le dernier train de la nuit, wagon par wagon.",
        content: content(
          "fr",
          [
            "Démo d'un jeu beat 'em up où le joueur traverse le dernier train de la nuit en affrontant des ennemis wagon par wagon.",
            "Développé avec le framework Phaser, rendu sur canvas et publié sur GitHub Pages.",
          ],
          [
            "Des wagons avec leurs propres décors et une progression jusqu'au terminus",
            "Coups de poing, saisies, projections et armes à ramasser",
            "Barre de vie et score",
            "Contrôles au clavier : WASD ou flèches pour se déplacer, J pour frapper, K pour saisir et L pour ramasser une arme",
            "Fonctionne directement dans le navigateur, sans installation",
          ],
        ),
      },
    },
  },
  {
    slug: "magnum-bank",
    githubUrl: "https://github.com/sergiofisio/magnum-bank",
    siteUrl: "https://magnum-bank-nu.vercel.app",
    coverImage: "/projects/magnum-bank.webp",
    images: ["/projects/magnum-bank.webp", "/projects/magnum-bank-login.webp", "/projects/magnum-bank-cadastro.webp"],
    order: 10,
    technologies: ["React", "TypeScript", "Redux", "Tailwind CSS", "Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "JWT"],
    translations: {
      pt: {
        title: "Magnum Bank",
        summary:
          "Banco digital full stack desenvolvido como teste técnico: contas, PIX e TED, extrato com filtros, auditoria e interface em três idiomas.",
        content: content(
          "pt",
          [
            "Aplicação que simula um banco digital, desenvolvida como teste técnico full stack. Em vez de uma API mockada, construí uma API completa para uma simulação mais realista.",
            "Backend em Node.js, Express, TypeScript, Prisma e PostgreSQL. Frontend em React, Vite, Redux Toolkit, React Router e Tailwind CSS.",
          ],
          [
            "Cadastro em etapas e login com CPF, senha e JWT",
            "Logout automático após 10 minutos de inatividade, com aviso antes de expirar",
            "Várias contas por usuário, com saldos que podem ser ocultados",
            "Transferências PIX e TED confirmadas com senha de transação",
            "Extrato agrupado por dia, com saldo diário e filtros de 7 a 90 dias",
            "Trilha de auditoria com autor, IP e User-Agent das ações sensíveis",
            "Interface em português, inglês e francês",
          ],
        ),
      },
      en: {
        title: "Magnum Bank",
        summary:
          "Full stack digital bank built as a technical assessment: accounts, PIX and wire transfers, filtered statements, auditing and a three-language interface.",
        content: content(
          "en",
          [
            "Application that simulates a digital bank, built as a full stack technical assessment. Instead of a mocked API, I built a complete API for a more realistic simulation.",
            "Backend with Node.js, Express, TypeScript, Prisma and PostgreSQL. Frontend with React, Vite, Redux Toolkit, React Router and Tailwind CSS.",
          ],
          [
            "Multi-step sign-up and login with CPF, password and JWT",
            "Automatic logout after 10 minutes of inactivity, with a warning before it expires",
            "Multiple accounts per user, with balances that can be hidden",
            "PIX and wire transfers confirmed with a transaction password",
            "Statement grouped by day, with daily balance and 7 to 90-day filters",
            "Audit trail with author, IP and User-Agent for sensitive actions",
            "Portuguese, English and French interface",
          ],
        ),
      },
      fr: {
        title: "Magnum Bank",
        summary:
          "Banque en ligne full stack réalisée comme test technique : comptes, virements PIX et TED, relevé filtrable, audit et interface en trois langues.",
        content: content(
          "fr",
          [
            "Application qui simule une banque en ligne, réalisée comme test technique full stack. Au lieu d'une API simulée, j'ai développé une API complète pour une simulation plus réaliste.",
            "Backend en Node.js, Express, TypeScript, Prisma et PostgreSQL. Frontend en React, Vite, Redux Toolkit, React Router et Tailwind CSS.",
          ],
          [
            "Inscription en plusieurs étapes et connexion par CPF, mot de passe et JWT",
            "Déconnexion automatique après 10 minutes d'inactivité, avec un avertissement avant l'expiration",
            "Plusieurs comptes par utilisateur, avec des soldes masquables",
            "Virements PIX et TED confirmés par un mot de passe de transaction",
            "Relevé regroupé par jour, avec solde quotidien et filtres de 7 à 90 jours",
            "Piste d'audit avec auteur, IP et User-Agent des actions sensibles",
            "Interface en portugais, anglais et français",
          ],
        ),
      },
    },
  },
  {
    slug: "teddy-gestao-de-clientes",
    githubUrl: "https://github.com/sergiofisio/teddy_web",
    siteUrl: "https://teddy-web-ruby.vercel.app",
    coverImage: "/projects/teddy.webp",
    images: ["/projects/teddy.webp"],
    order: 11,
    technologies: ["React", "TypeScript", "Material UI", "Nest.js", "TypeORM", "PostgreSQL", "Docker", "Swagger", "Jest"],
    translations: {
      pt: {
        title: "Teddy — Gestão de Clientes",
        summary:
          "Sistema de gestão de clientes desenvolvido como desafio técnico para a Teddy Open Finance, com frontend em React e API em NestJS.",
        content: content(
          "pt",
          [
            "Desafio técnico full stack: um painel para cadastrar, editar, excluir e selecionar clientes, com uma API REST em NestJS e TypeORM sobre PostgreSQL, documentada com Swagger e containerizada com Docker ([código da API](https://github.com/sergiofisio/teddy_server)).",
            "O frontend usa React, TypeScript, Material UI e Framer Motion. A API está hospedada no plano gratuito do Render, então o primeiro acesso pode levar alguns segundos.",
          ],
          [
            "Cadastro, edição e exclusão de clientes, com paginação",
            "Seleção de clientes para ações específicas",
            "Navbar responsiva com menu lateral",
            "API REST para clientes, empresas, endereços e telefones",
            "Documentação com Swagger e testes com Jest",
          ],
        ),
      },
      en: {
        title: "Teddy — Customer Management",
        summary:
          "Customer management system built as a technical assessment for Teddy Open Finance, with a React frontend and a NestJS API.",
        content: content(
          "en",
          [
            "Full stack technical assessment: a dashboard to create, edit, delete and select customers, backed by a NestJS and TypeORM REST API on PostgreSQL, documented with Swagger and containerized with Docker ([API code](https://github.com/sergiofisio/teddy_server)).",
            "The frontend uses React, TypeScript, Material UI and Framer Motion. The API runs on Render's free tier, so the first request may take a few seconds.",
          ],
          [
            "Create, edit and delete customers, with pagination",
            "Customer selection for specific actions",
            "Responsive navbar with a side menu",
            "REST API for customers, companies, addresses and phone numbers",
            "Swagger documentation and Jest tests",
          ],
        ),
      },
      fr: {
        title: "Teddy — Gestion de Clients",
        summary:
          "Système de gestion de clients réalisé comme test technique pour Teddy Open Finance, avec un frontend React et une API NestJS.",
        content: content(
          "fr",
          [
            "Test technique full stack : un tableau de bord pour créer, modifier, supprimer et sélectionner des clients, avec une API REST en NestJS et TypeORM sur PostgreSQL, documentée avec Swagger et conteneurisée avec Docker ([code de l'API](https://github.com/sergiofisio/teddy_server)).",
            "Le frontend utilise React, TypeScript, Material UI et Framer Motion. L'API est hébergée sur l'offre gratuite de Render, le premier accès peut donc prendre quelques secondes.",
          ],
          [
            "Création, modification et suppression de clients, avec pagination",
            "Sélection de clients pour des actions spécifiques",
            "Barre de navigation responsive avec menu latéral",
            "API REST pour clients, entreprises, adresses et téléphones",
            "Documentation Swagger et tests avec Jest",
          ],
        ),
      },
    },
  },
  {
    slug: "lacrei-saude",
    githubUrl: "https://github.com/sergiofisio/desafio-lacrei-saude",
    siteUrl: "https://desafio-lacrei-saude-nine.vercel.app",
    coverImage: "/projects/lacrei-saude.webp",
    images: ["/projects/lacrei-saude.webp"],
    order: 12,
    technologies: ["Next.js", "React", "TypeScript", "Styled Components", "Jest"],
    translations: {
      pt: {
        title: "Lacrei Saúde",
        summary:
          "Front-end para o processo seletivo de voluntariado da Lacrei Saúde, seguindo o design system Marsha, com foco em acessibilidade.",
        content: content(
          "pt",
          [
            "A Lacrei Saúde conecta a comunidade LGBTQIAPN+ a profissionais de saúde qualificados. O desafio foi construir páginas acessíveis com base no design system Marsha.",
            "Feito com Next.js (App Router), TypeScript e Styled-Components, com API mockada via Route Handlers e MSW e testes com Jest e Testing Library.",
          ],
          [
            "Páginas Início e Sobre, com header e footer",
            "Tema claro e escuro salvo no navegador, sem flash na hidratação",
            "Formulário de interesse, FAQ e busca de profissionais",
            "HTML semântico, skip link, foco visível e ARIA",
            "Testes unitários dos principais componentes",
          ],
        ),
      },
      en: {
        title: "Lacrei Saúde",
        summary:
          "Frontend built for Lacrei Saúde's volunteer selection process, following the Marsha design system with a focus on accessibility.",
        content: content(
          "en",
          [
            "Lacrei Saúde connects the LGBTQIAPN+ community with qualified healthcare professionals. The challenge was to build accessible pages based on the Marsha design system.",
            "Built with Next.js (App Router), TypeScript and Styled-Components, with a mocked API through Route Handlers and MSW, and tests with Jest and Testing Library.",
          ],
          [
            "Home and About pages, with header and footer",
            "Light and dark theme saved in the browser, with no flash on hydration",
            "Interest form, FAQ and professional search",
            "Semantic HTML, skip link, visible focus and ARIA",
            "Unit tests for the main components",
          ],
        ),
      },
      fr: {
        title: "Lacrei Saúde",
        summary:
          "Frontend réalisé pour le processus de sélection de bénévoles de Lacrei Saúde, selon le design system Marsha, avec un focus sur l'accessibilité.",
        content: content(
          "fr",
          [
            "Lacrei Saúde met en relation la communauté LGBTQIAPN+ avec des professionnels de santé qualifiés. Le défi consistait à créer des pages accessibles basées sur le design system Marsha.",
            "Réalisé avec Next.js (App Router), TypeScript et Styled-Components, avec une API simulée via Route Handlers et MSW, et des tests avec Jest et Testing Library.",
          ],
          [
            "Pages Accueil et À propos, avec en-tête et pied de page",
            "Thème clair et sombre enregistré dans le navigateur, sans flash à l'hydratation",
            "Formulaire d'intérêt, FAQ et recherche de professionnels",
            "HTML sémantique, lien d'évitement, focus visible et ARIA",
            "Tests unitaires des principaux composants",
          ],
        ),
      },
    },
  },
  {
    slug: "unsplashbox",
    githubUrl: "https://github.com/sergiofisio/unsplash-collection",
    siteUrl: "https://unsplash-collection-nine.vercel.app",
    coverImage: "/projects/unsplashbox.webp",
    images: ["/projects/unsplashbox.webp", "/projects/unsplashbox-home.webp"],
    order: 13,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Zustand"],
    translations: {
      pt: {
        title: "UnsplashBox",
        summary:
          "Busca de fotos do Unsplash com coleções personalizadas, desenvolvida para o desafio Unsplash Collection do devChallenges.",
        content: content(
          "pt",
          [
            "Solução do desafio Unsplash Collection do devChallenges.io: pesquise fotos em alta resolução, veja os detalhes, faça o download e organize as imagens em coleções próprias.",
            "A chave da API do Unsplash fica protegida no servidor, com proxy pelos Route Handlers do Next.js. As coleções são salvas com Prisma e SQLite e o estado do cliente é gerenciado com Zustand.",
          ],
          [
            "Busca por palavra-chave com grade em masonry e paginação",
            "Página de detalhe com autor, data de publicação e download",
            "Criação de coleções e organização das fotos",
            "API própria para as coleções, sem expor a chave no navegador",
            "Animações de entrada com Motion",
          ],
        ),
      },
      en: {
        title: "UnsplashBox",
        summary: "Unsplash photo search with custom collections, built for the devChallenges Unsplash Collection challenge.",
        content: content(
          "en",
          [
            "Solution to the devChallenges.io Unsplash Collection challenge: search high-resolution photos, see their details, download them and organize them into your own collections.",
            "The Unsplash API key stays on the server, proxied through Next.js Route Handlers. Collections are stored with Prisma and SQLite, and client state is managed with Zustand.",
          ],
          [
            "Keyword search with a masonry grid and pagination",
            "Detail page with author, publish date and download",
            "Collection creation and photo organization",
            "Custom collections API that never exposes the key to the browser",
            "Entrance animations with Motion",
          ],
        ),
      },
      fr: {
        title: "UnsplashBox",
        summary: "Recherche de photos Unsplash avec collections personnalisées, réalisée pour le défi Unsplash Collection de devChallenges.",
        content: content(
          "fr",
          [
            "Solution au défi Unsplash Collection de devChallenges.io : recherchez des photos en haute résolution, consultez leurs détails, téléchargez-les et organisez-les dans vos propres collections.",
            "La clé de l'API Unsplash reste sur le serveur, via un proxy dans les Route Handlers de Next.js. Les collections sont enregistrées avec Prisma et SQLite, et l'état côté client est géré avec Zustand.",
          ],
          [
            "Recherche par mot-clé avec grille masonry et pagination",
            "Page de détail avec auteur, date de publication et téléchargement",
            "Création de collections et organisation des photos",
            "API dédiée aux collections, sans exposer la clé au navigateur",
            "Animations d'entrée avec Motion",
          ],
        ),
      },
    },
  },
  {
    slug: "pantheo-tech",
    githubUrl: "https://github.com/sergiofisio/pantheo-ladding-page",
    siteUrl: "https://pantheo-ladding-page.vercel.app",
    coverImage: "/projects/pantheo-tech.webp",
    images: ["/projects/pantheo-tech.webp"],
    order: 14,
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Material UI"],
    translations: {
      pt: {
        title: "Pantheo Tech",
        summary: "Landing page para uma software house, com seções de serviços e diferenciais e formulário de contato validado.",
        content: content(
          "pt",
          [
            "Landing page institucional da Pantheo Tech, empresa de desenvolvimento de software sob medida, aplicativos e e-commerce.",
            "Construída com React 19, Vite, TypeScript, Tailwind CSS e Material UI, com formulário em React Hook Form, validação com Zod e máscaras de input.",
          ],
          [
            "Hero com chamada para contato",
            "Seções de serviços e diferenciais",
            "Formulário de contato com validação e máscaras",
            "Layout responsivo",
          ],
        ),
      },
      en: {
        title: "Pantheo Tech",
        summary: "Landing page for a software house, with services and differentiators sections and a validated contact form.",
        content: content(
          "en",
          [
            "Company landing page for Pantheo Tech, a custom software, mobile app and e-commerce development company.",
            "Built with React 19, Vite, TypeScript, Tailwind CSS and Material UI, with a React Hook Form contact form, Zod validation and input masks.",
          ],
          [
            "Hero with a call to action for contact",
            "Services and differentiators sections",
            "Contact form with validation and masks",
            "Responsive layout",
          ],
        ),
      },
      fr: {
        title: "Pantheo Tech",
        summary: "Landing page pour une entreprise de développement, avec sections services et points forts et formulaire de contact validé.",
        content: content(
          "fr",
          [
            "Landing page de Pantheo Tech, entreprise de développement de logiciels sur mesure, d'applications et de boutiques en ligne.",
            "Réalisée avec React 19, Vite, TypeScript, Tailwind CSS et Material UI, avec un formulaire React Hook Form, une validation Zod et des masques de saisie.",
          ],
          [
            "Section d'accueil avec appel à la prise de contact",
            "Sections services et points forts",
            "Formulaire de contact avec validation et masques",
            "Mise en page responsive",
          ],
        ),
      },
    },
  },
];

async function main() {
  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    });
  }

  for (const { technologies: techNames, translations, ...project } of projects) {
    const exists = await prisma.project.findUnique({ where: { slug: project.slug } });
    if (exists) continue;

    await prisma.project.create({
      data: {
        ...project,
        technologies: { connect: techNames.map((name) => ({ name })) },
        translations: {
          create: Object.entries(translations).map(([locale, t]) => ({ locale, ...t })),
        },
      },
    });
  }

  console.log("Seed concluído.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
