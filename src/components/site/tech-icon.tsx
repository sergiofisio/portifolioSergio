import { cn } from "@/lib/utils";

export function TechIcon({
  name,
  icon,
  size = 24,
  className,
}: {
  name: string;
  icon: string | null;
  size?: number;
  className?: string;
}) {
  if (icon) {
    const img = (
      <img
        src={icon}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={cn("shrink-0 rounded-md", className)}
      />
    );

    // skillicons.dev icons already ship with their own dark tile
    if (icon.includes("skillicons.dev")) return img;

    return (
      <span
        style={{ width: size, height: size, padding: size * 0.18 }}
        className={cn("flex shrink-0 items-center justify-center rounded-md bg-[#242938]", className)}
        aria-hidden
      >
        <img src={icon} alt="" loading="lazy" className="h-full w-full object-contain" />
      </span>
    );
  }

  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md bg-linear-to-br from-primary/40 to-accent/40 font-mono font-bold",
        className,
      )}
      aria-hidden
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
