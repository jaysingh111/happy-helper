import { ReactNode } from "react";

interface SlideShellProps {
  children: ReactNode;
  eyebrow?: string;
  index: number;
  total: number;
}

export const SlideShell = ({ children, eyebrow, index, total }: SlideShellProps) => {
  return (
    <div className="slide-content relative w-[1920px] h-[1080px] bg-background overflow-hidden">
      {/* Ambient layers */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div
        className="absolute -top-[400px] -right-[300px] w-[900px] h-[900px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, hsl(184 85% 50% / 0.7), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-[400px] -left-[300px] w-[900px] h-[900px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, hsl(210 90% 50% / 0.6), transparent 70%)" }}
      />

      {/* Header */}
      <div className="absolute top-16 left-20 right-20 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-brand-gradient" />
            <div className="absolute inset-[3px] rounded-full bg-background" />
            <div className="absolute inset-[7px] rounded-full bg-brand-gradient" />
          </div>
          <span className="text-[18px] font-medium tracking-[0.3em] text-white/80">FIGURA LABS</span>
        </div>
        {eyebrow && (
          <span className="text-[16px] tracking-eyebrow text-white/50">{eyebrow}</span>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 pt-44 pb-32 px-20 flex flex-col z-10">{children}</div>

      {/* Footer */}
      <div className="absolute bottom-12 left-20 right-20 flex items-center justify-between z-10">
        <span className="text-[16px] text-white/40 tracking-wide">Confidential · Investor Material</span>
        <span className="text-[16px] text-white/60 tabular-nums">
          <span className="text-white">{String(index).padStart(2, "0")}</span>
          <span className="text-white/30"> / {String(total).padStart(2, "0")}</span>
        </span>
      </div>

      {/* Edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[hsl(184_85%_55%/0.5)] to-transparent" />
    </div>
  );
};
