import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  colorClassName?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, className = "", colorClassName = "bg-blue-600", ...props }, ref) => {
    const clamped = Math.max(0, Math.min(100, value));
    return (
      <div ref={ref} className={`relative h-2 w-full overflow-hidden rounded bg-gray-200 ${className}`} {...props}>
        <div className={`h-full ${colorClassName}`} style={{ width: `${clamped}%` }} />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export default Progress;
