import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-8xl font-bold text-gradient">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-muted">{t("description")}</p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        {t("back")}
      </Link>
    </section>
  );
}
