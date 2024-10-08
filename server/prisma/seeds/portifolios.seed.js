const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedPortifoliosBr() {
  const portifoliosToCreate = [
    {
      title: { br: "CuboFlix", en: "CuboFlix", fr: "CuboFlix" },
      description: {
        br: "Projeto realizado no curso de desenvolvimento de software da Cubos Academy.\n\nNeste desafio, nos foi proposto a criação de um site chamado CuboFlix.\n\nUtilizei a framework AXIOS para acessar os dados da API e assim foi possível:\n\n1. Listar os filmes disponíveis na API;\n\n2. Buscar filmes por nome;\n\n3. Destaque do dia\n\n4. Mudança de tema para escuro ou claro, com persistência na atualização da página",
        en: "Project completed in the Cubos Academy software development course.\n\nIn this challenge, we were tasked with creating a website called CuboFlix.\n\nI used the AXIOS framework to access API data, enabling:\n\n1. Listing available movies in the API;\n\n2. Searching for movies by name;\n\n3. Daily highlights\n\n4. Theme switching between dark and light, with persistence upon page refresh",
        fr: "Projet réalisé dans le cadre du cours de développement de logiciels de Cubos Academy.\n\nDans ce défi, nous avons été chargés de créer un site Web appelé CuboFlix.\n\nJ'ai utilisé le framework AXIOS pour accéder aux données de l'API, permettant :\n\n1. Liste des films disponibles dans l'API;\n\n2. Recherche de films par nom;\n\n3. Faits saillants quotidiens\n\n4. Changement de thème entre sombre et clair, avec persistance lors du rafraîchissement de la page",
      },
      images: [
        {
          url: "https://s3.us-east-005.backblazeb2.com/portifolioSergio/cuboflix.png",
        },
      ],
      url: "https://cuboflix.vercel.app/",
      github: "https://github.com/portifolioSergiofisio/cuboflix",
    },
    {
      title: {
        br: "Aplicação Cobrança",
        en: "Billing Application",
        fr: "Application de facturation",
      },
      description: {
        br: "Esta aplicação foi desenvolvida no desafio do módulo 3 do curso de Desenvolvimento de Software da Cubos Academy.\n\nEsta é uma aplicação para controle financeiro pessoal que permite que o usuário adicione suas receitas e despesas, e acompanhe seu saldo.\n\nA aplicação foi escrita utilizando ReactJS, o backend foi desenvolvido em Node.js e o banco de dados utlizado foi PostgresSQL, um banco relacional.\n\nFuncionalidades:\n\n- Cadastro de usuário\n\n- Login de usuário\n\n- Adição de receitas e despesas\n\n- Listagem de receitas e despesas\n\n- Edição e exclusão de receitas e despesas",
        en: "This application was developed in the challenge of module 3 of the Cubos Academy Software Development course.\n\nThis is an application for personal financial control that allows the user to add their income and expenses and track their balance.\n\nThe application was written using ReactJS, the backend was developed in Node.js, and the database used was PostgresSQL, a relational database.\n\nFunctionalities:\n\n- User registration\n\n- User login\n\n- Addition of income and expenses\n\n- Listing of income and expenses\n\n- Editing and deletion of income and expenses",
        fr: "Cette application a été développée dans le cadre du défi du module 3 du cours de développement de logiciels de Cubos Academy.\n\nIl s'agit d'une application de contrôle financier personnel qui permet à l'utilisateur d'ajouter ses revenus et ses dépenses et de suivre son solde.\n\nL'application a été écrite en utilisant ReactJS, le backend a été développé en Node.js et la base de données utilisée était PostgresSQL, une base de données relationnelle.\n\nFonctionnalités:\n\n- Inscription de l'utilisateur\n\n- Connexion de l'utilisateur\n\n- Ajout de revenus et dépenses\n\n- Liste des revenus et dépenses\n\n- Édition et suppression de revenus et dépenses",
      },
      images: [
        {
          url: "https://s3.us-east-005.backblazeb2.com/portifolioSergio/cobranca.png",
        },
      ],
      url: "https://app-cobranca.vercel.app/",
      github: "https://github.com/portifolioSergiofisio/aplicacaoCobranca",
    },
    {
      title: {
        br: "Pokedex",
        en: "Pokedex",
        fr: "Pokedex",
      },
      description: {
        br: "Esta é uma aplicação que permite ao usuário visualizar e gerenciar informações sobre diferentes Pokémon.\n\nA aplicação foi escrita utilizando Angular, sem backend e banco de dados. Foi utilizado Axios para acessar a PokeAPI e listar as informações dos Pokémon.\n\nFuncionalidades:\n\n- Cadastro de usuário\n\n- Login de usuário\n\n- Visualização de informações detalhadas dos Pokémon\n\n- Adição e edição de Pokémon favoritos\n\n- Listagem de todos os Pokémon",
        en: "This is an application that allows users to view and manage information about different Pokémon.\n\nThe application was written using Angular, without backend and database. Axios was used to access the PokeAPI and list the information of the Pokémon.\n\nFunctionalities:\n\n- User registration\n\n- User login\n\n- Viewing detailed information of Pokémon\n\n- Adding and editing favorite Pokémon\n\n- Listing all Pokémon",
        fr: "Il s'agit d'une application qui permet aux utilisateurs de visualiser et de gérer des informations sur différents Pokémon.\n\nL'application a été écrite en utilisant Angular, sans backend ni base de données. Axios a été utilisé pour accéder à la PokeAPI et lister les informations des Pokémon.\n\nFonctionnalités :\n\n- Enregistrement de l'utilisateur\n\n- Connexion de l'utilisateur\n\n- Visualisation des informations détaillées des Pokémon\n\n- Ajout et modification des Pokémon favoris\n\n- Liste de tous les Pokémon",
      },
      images: [
        {
          url: "https://s3.us-east-005.backblazeb2.com/portifolioSergio/pokedex.png",
        },
      ],
      url: "https://pokedex-new-xi.vercel.app/",
      github: "https://github.com/portifolioSergiofisio/pokedexNew",
    },
  ];

  for (const portifolio of portifoliosToCreate) {
    const commonFieldsData = {
      titleId: portifolio.title.br
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, ""),
      url: portifolio.url,
      github: portifolio.github,
    };

    const commonFields = await prisma.commonFields.upsert({
      where: { url: commonFieldsData.url },
      update: commonFieldsData,
      create: commonFieldsData,
    });

    const createOrUpdatePortifolio = async (
      model,
      title,
      description,
      language
    ) => {
      try {
        const existingPortfolio = await prisma[model].findUnique({
          where: { title: title },
        });

        if (existingPortfolio) {
          throw new Error(
            `Portfólio '${title}' no idioma '${language}' já existe no banco de dados.`
          );
        }

        await prisma[model].create({
          data: {
            title: title,
            description: description,
            commonFieldsId: commonFields.id,
          },
        });

        console.log(`Portfólio '${title}' criado no idioma '${language}'.`);
      } catch (error) {
        console.log(error.message);
      }
    };

    for (let i = 0; i < portifolio.images.length; i++) {
      const findImage = await prisma.image.findFirst({
        where: { url: portifolio.images[i.url] },
      });
      if (findImage.length) {
        await prisma.image.create({
          data: {
            url: portifolio.images[i].url,
            alt: `image ${i + 1} ${portifolio.title.br}`,
            commonFieldsId: commonFields.id,
          },
        });
        console.log(`Imagem do ${portifolio.title.br} foi adicionada`);
      } else {
        console.log(`Imagem do ${portifolio.title.br} ja existe`);
      }
    }

    await createOrUpdatePortifolio(
      "portifoliosBr",
      portifolio.title.br,
      portifolio.description.br,
      "pt"
    );
    await createOrUpdatePortifolio(
      "portifoliosEn",
      portifolio.title.en,
      portifolio.description.en,
      "en"
    );
    await createOrUpdatePortifolio(
      "portifoliosFr",
      portifolio.title.fr,
      portifolio.description.fr,
      "fr"
    );
  }
}

module.exports = seedPortifoliosBr;
