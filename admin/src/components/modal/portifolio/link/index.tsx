import github from "../../../../assets/projects/github.svg";
import deploy from "../../../../assets/projects/site.svg";

export default function Link({ url, type }: { url: string; type: string }) {
  console.log({ url, type });

  return (
    <a
      className="flex items-center justify-center bg-black rounded-full p-4 w-32 h-32"
      href={url}
      target="_blank"
    >
      <img
        className="w-full h-full "
        src={type === "github" ? github : deploy}
        alt={`img ${type}`}
      />
    </a>
  );
}
