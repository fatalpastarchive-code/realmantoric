import React from "react";
import { cn } from "@/lib/utils";

interface WidgetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: string;
}

export function WidgetCard({
  title,
  icon,
  description,
  badge,
  className,
  children,
  ...props
}: WidgetCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[32px] border border-white/[0.05] bg-white/[0.02] p-6 transition-all duration-500 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
        className
      )}
      {...props}
    >
      {/* Background soft glow on hover */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.02] blur-3xl transition-all duration-500 group-hover:bg-white/[0.05]" />

      <div className="relative z-10 flex flex-col h-full">
        {(title || icon || badge) && (
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.03] text-white/40 transition-colors group-hover:text-white">
                  {icon}
                </div>
              )}
              <div>
                {title && (
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-white/90">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs font-medium text-white/30">
                    {description}
                  </p>
                )}
              </div>
            </div>
            {badge && (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                {badge}
              </span>
            )}
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
