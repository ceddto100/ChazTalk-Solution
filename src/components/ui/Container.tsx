import { cn } from "@/lib/utils";

export function Container({
  className,
  tight,
  children,
}: {
  className?: string;
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(tight ? "container-tight" : "container", className)}>{children}</div>
  );
}
