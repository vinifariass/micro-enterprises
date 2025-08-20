import * as React from "react";

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Separator({ orientation = "horizontal", className = "", ...props }: SeparatorProps) {
  const base = "shrink-0 bg-gray-200 dark:bg-gray-800";
  const cn = orientation === "vertical" ? `w-px h-6 ${base}` : `h-px w-full ${base}`;
  return <div role="separator" aria-orientation={orientation} className={`${cn} ${className}`} {...props} />;
}

export default Separator;
