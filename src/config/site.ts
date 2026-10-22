export const siteConfig = {
  name: "Sergio Bastos",
  fullName: "Sergio Augusto Moreira Bastos Jr.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devsergiofisico.com.br",
  location: "São Bernardo do Campo, SP — Brasil",
  email: "sergiobastosfisio@gmail.com",
  phoneDisplay: "+55 (11) 96593-2620",
  whatsapp: "https://wa.me/5511965932620",
  github: "https://github.com/sergiofisio",
  linkedin: "https://www.linkedin.com/in/sergio-bastos-jr/",
  linkedinActivity: "https://www.linkedin.com/in/sergio-bastos-jr/recent-activity/all/",
  cv: {
    pt: "/cv/cv-pt.pdf",
    en: "/cv/cv-en.pdf",
    fr: "/cv/cv-fr.pdf",
  },
} as const;

export const navSections = [
  "about",
  "experience",
  "skills",
  "projects",
  "services",
  "content",
  "contact",
] as const;
