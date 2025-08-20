import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const styles: Record<string, string> = {
    default: "bg-gray-900 text-white border-transparent",
    secondary: "bg-gray-100 text-gray-900 border-gray-200",
    destructive: "bg-red-600 text-white border-red-700",
    outline: "bg-transparent text-gray-900 border-gray-300",
  };
  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${styles[variant]} ${className}`} {...props} />
  );
}

export default Badge;
