import type { ReactNode } from "react";

export default function SectionCard({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200 p-5 ${className}`}
    >
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}
