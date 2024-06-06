export default function Description({
  text,
  language,
}: {
  text: string;
  language: string;
}) {
  return (
    <p className="text-black text-base max-h-20 overflow-y-auto">
      <span className="text-black font-bold">Descrição {language}: </span>{" "}
      {text}
    </p>
  );
}
