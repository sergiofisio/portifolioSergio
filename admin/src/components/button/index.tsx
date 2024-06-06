export default function Button({
  className,
  type,
  text,
  onClick,
  disabled,
}: {
  className?: string;
  type: "button" | "submit" | "reset";
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`${className} w-1/4 h-10  text-white hover:bg-white  border-2 rounded-3xl transition-all duration-500 ease-in-out`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
