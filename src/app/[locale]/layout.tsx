import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/site/header";
import { ContactDialogProvider } from "@/components/site/contact-dialog";
import { ContactFab } from "@/components/site/contact-fab";
import { Footer } from "@/components/site/footer";
import { MotionProvider } from "@/components/site/motion-provider";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: `%s · ${siteConfig.name}` },
    description: t("description"),
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      locale,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
      <body className="min-h-screen font-sans">
        <NextIntlClientProvider>
          <MotionProvider>
            <ContactDialogProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <ContactFab />
            </ContactDialogProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
