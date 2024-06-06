export default function Title({
  text,
  language,
}: {
  text: string;
  language: string;
}) {
  return (
    <h2 className="text-black ">
      <span className="text-black font-bold ">Titulo {language}: </span> {text}
    </h2>
  );
}
