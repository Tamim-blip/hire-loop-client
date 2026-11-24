import { cn } from "@/lib/utils";

type ApplicantAvatarProps = {
  name: string;
  className?: string;
};

export function ApplicantAvatar({ name, className }: ApplicantAvatarProps) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?";

  return (
    <div
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className,
      )}
    >
      {initials}
    </div>
  );
}
