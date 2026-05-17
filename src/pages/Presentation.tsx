import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { SlideShell } from "@/components/SlideShell";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

/* ===================== SLIDES ===================== */

const Slide1 = (p: { idx: number; total: number }) => (
  <SlideShell index={p.idx} total={p.total}>
    <div className="flex-1 flex flex-col justify-center">
      <span className="text-[20px] tracking-eyebrow text-gradient mb-10">Investor Presentation · 2026</span>
      <h1 className="font-display text-[220px] leading-[0.92] tracking-tight text-white mb-12">
        Figura<span className="text-gradient"> Labs</span>
      </h1>
      <p className="text-[56px] font-light leading-[1.15] text-white/85 max-w-[1500px]">
        Turning shopping <span className="italic font-display text-gradient">uncertainty</span> into revenue.
      </p>
      <div className="mt-20 flex items-center gap-6">
        <div className="h-[1px] w-[120px] bg-brand-gradient" />
        <span className="text-[22px] text-white/60 tracking-wide">The confidence layer for fashion ecommerce</span>
      </div>
    </div>
  </SlideShell>
);

const Slide2 = (p: { idx: number; total: number }) => {
  const stats = [
    { v: "$218B", l: "lost to returns every year" },
    { v: "60%", l: "average return rate in online fashion" },
    { v: "73%", l: "caused by wrong size or fit" },
  ];
  const scenarios = [
    { n: "01", t: "Buys wrong product", s: "Returns" },
    { n: "02", t: "Buys multiple options", s: "Returns the rest" },
    { n: "03", t: "Abandons purchase", s: "Due to uncertainty" },
    { n: "04", t: "Feels confident", s: "Buys correctly" },
  ];
  return (
    <SlideShell index={p.idx} total={p.total} eyebrow="The Problem">
      <div className="grid grid-cols-12 gap-12 flex-1">
        <div className="col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-[88px] leading-[0.95] text-white mb-10">
              Shoppers <span className="text-gradient italic">guess</span><br/>because of<br/>uncertainty.
            </h2>
            <p className="text-[28px] text-white/65 font-light max-w-[560px]">
              Retailers pay for it. The root cause is not logistics — it is <span className="text-white">uncertainty</span>.
            </p>
          </div>
          <div className="space-y-6 mt-12">
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-6 border-b border-white/10 pb-5">
                <span className="font-display text-[72px] text-gradient leading-none w-[260px]">{s.v}</span>
                <span className="text-[22px] text-white/70">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7 flex flex-col">
          <p className="text-[24px] text-white/60 mb-8 tracking-wide">Shoppers still cannot know</p>
          <div className="flex gap-4 mb-12">
            {["how a garment fits", "how it looks on them", "how to style it"].map((x) => (
              <div key={x} className="flex-1 panel rounded-2xl p-7">
                <div className="w-3 h-3 rounded-full bg-brand-gradient mb-5" />
                <p className="text-[24px] text-white/90 leading-tight">{x}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5 flex-1">
            {scenarios.map((s, i) => {
              const win = i === 3;
              return (
                <div
                  key={s.n}
                  className={`relative rounded-2xl p-8 flex flex-col justify-between overflow-hidden ${
                    win ? "ring-brand" : ""
                  }`}
                  style={{
                    background: win
                      ? "linear-gradient(135deg, hsl(184 85% 20% / 0.6), hsl(200 90% 25% / 0.4))"
                      : "linear-gradient(160deg, hsl(0 0% 8%), hsl(0 0% 4%))",
                    border: win ? "1px solid hsl(184 85% 55% / 0.5)" : "1px solid hsl(0 0% 100% / 0.06)",
                  }}
                >
                  <span className={`text-[18px] tracking-eyebrow ${win ? "text-gradient" : "text-white/40"}`}>
                    Scenario {s.n}
                  </span>
                  <div>
                    <p className="text-[30px] text-white font-medium leading-tight">{s.t}</p>
                    <p className={`text-[22px] mt-2 ${win ? "text-white/90" : "text-white/50"}`}>{s.s}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-[22px] text-white/70 font-light italic">
            That single gap costs fashion retailers more than anything else.
          </p>
        </div>
      </div>
    </SlideShell>
  );
};

const Slide3 = (p: { idx: number; total: number }) => {
  const issues = [
    "Only solve one uncertainty",
    "Require manual per-product setup",
    "Create high shopper friction",
    "Expensive and complex to integrate",
    "Low usage rates",
    "Only work on selected products",
    "Reset the shopper every time",
    "Suffer from low shopper trust",
  ];
  const kpis = [
    { v: "3–18%", l: "Return rates reduced" },
    { v: "2–6%", l: "AOV increased" },
    { v: "8–22%", l: "Conversion increased" },
  ];
  return (
    <SlideShell index={p.idx} total={p.total} eyebrow="The Landscape">
      <div className="flex flex-col flex-1">
        <h2 className="font-display text-[80px] leading-[0.95] text-white max-w-[1500px]">
          Similar companies have tried solving this <span className="italic text-gradient">for decades.</span>
        </h2>

        <div className="grid grid-cols-12 gap-10 mt-16 flex-1">
          <div className="col-span-7">
            <p className="text-[22px] text-white/55 tracking-eyebrow mb-8">Most solutions</p>
            <div className="grid grid-cols-2 gap-4">
              {issues.map((i, idx) => (
                <div key={i} className="flex items-start gap-4 panel rounded-xl p-5">
                  <span className="font-display text-[28px] text-gradient leading-none w-[42px]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[22px] text-white/85 leading-snug">{i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 flex flex-col">
            <p className="text-[22px] text-white/55 tracking-eyebrow mb-8">Yet they still achieved</p>
            <div className="flex-1 rounded-3xl p-10 panel flex flex-col justify-around">
              {kpis.map((k) => (
                <div key={k.v} className="border-b border-white/10 last:border-b-0 pb-6 last:pb-0">
                  <div className="font-display text-[88px] leading-none text-gradient">{k.v}</div>
                  <div className="text-[24px] text-white/75 mt-3">{k.l}</div>
                </div>
              ))}
            </div>
            <p className="text-[16px] text-white/40 mt-6">
              Sources: True Fit, Fit Analytics, Vogue Business, Shopify case studies.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

const Slide4 = (p: { idx: number; total: number }) => (
  <SlideShell index={p.idx} total={p.total} eyebrow="The Opportunity">
    <div className="flex-1 flex flex-col justify-center items-start">
      <span className="font-display italic text-[60px] text-gradient mb-10">What if…</span>
      <h2 className="font-display text-[110px] leading-[0.98] text-white max-w-[1700px]">
        those gains applied to <span className="italic text-gradient">every product</span> in your catalog —
        while answering <span className="italic text-gradient">every shopping uncertainty</span> with only one photo?
      </h2>

      <div className="mt-24 panel rounded-3xl p-12 max-w-[1500px] relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-[6px] bg-brand-gradient" />
        <p className="text-[38px] text-white font-light leading-tight">
          This is not a cool feature.
        </p>
        <p className="text-[38px] text-gradient font-display italic mt-2">
          This is the confidence layer your catalog has been missing.
        </p>
      </div>
    </div>
  </SlideShell>
);

const Slide5 = (p: { idx: number; total: number }) => {
  const steps = [
    { n: "01", t: "Upload", d: "One photo. One time only." },
    { n: "02", t: "Analyse", d: "3D body reconstruction. 11 measurements." },
    { n: "03", t: "Try on", d: "See the garment on your body. Instantly." },
    { n: "04", t: "Size", d: "Exact recommendation. 95% accuracy." },
  ];
  return (
    <SlideShell index={p.idx} total={p.total} eyebrow="The Product">
      <div className="flex flex-col flex-1">
        <h2 className="font-display text-[96px] leading-[0.95] text-white">
          One photo. <span className="text-gradient italic">Every garment.</span> Perfect fit.
        </h2>
        <p className="text-[28px] text-white/65 font-light mt-8 max-w-[1500px]">
          Figura is a store-wide AI layer embedded in fashion ecommerce. Shoppers upload one full-body
          photo once — and from that moment, they see exactly how every garment fits their specific body,
          with a precise size recommendation and virtual try-on.
        </p>

        <div className="grid grid-cols-4 gap-6 mt-20 flex-1 items-stretch">
          {steps.map((s, i) => (
            <div key={s.n} className="relative panel rounded-2xl p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-gradient opacity-80" />
              <span className="font-display text-[28px] text-gradient">{s.n}</span>
              <div>
                <h3 className="font-display text-[64px] leading-none text-white mb-4">{s.t}</h3>
                <p className="text-[22px] text-white/65 leading-snug">{s.d}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border border-white/20 flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[hsl(184_85%_55%)] to-[hsl(200_90%_50%)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
};

const Slide6 = (p: { idx: number; total: number }) => (
  <SlideShell index={p.idx} total={p.total} eyebrow="How It Works">
    <div className="grid grid-cols-12 gap-12 flex-1">
      <div className="col-span-5 flex flex-col">
        <h2 className="font-display text-[84px] leading-[0.95] text-white">
          Deep technology.<br />
          <span className="text-gradient italic">Simple experience.</span>
        </h2>
        <p className="text-[24px] text-white/65 font-light mt-8 max-w-[640px]">
          The customer clicks Figura, logs in with Google or Apple, and uploads one full-body image.
          In under <span className="text-white font-medium">7 seconds</span>, Figura delivers a complete
          fit experience.
        </p>

        <div className="mt-auto panel rounded-2xl p-8">
          <p className="text-[20px] tracking-eyebrow text-white/50 mb-4">After the first upload</p>
          <p className="text-[36px] font-display text-white leading-tight">
            Click Figura <span className="text-gradient">→</span> get results.
          </p>
          <p className="text-[20px] text-white/55 mt-3">The experience becomes instant.</p>
        </div>
      </div>

      <div className="col-span-7 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          {[
            { t: "Virtual try-on", d: "See the garment on your own body." },
            { t: "Size & fit guidance", d: "Based on real body measurements and fit preferences." },
            { t: "Outfit matching", d: "Combine garments by typing what you want — with fit guidance for each piece." },
          ].map((c) => (
            <div key={c.t} className="panel rounded-2xl p-7">
              <div className="w-10 h-10 rounded-full bg-brand-gradient mb-5 opacity-90" />
              <h4 className="text-[24px] font-medium text-white mb-3 leading-tight">{c.t}</h4>
              <p className="text-[20px] text-white/60 leading-snug">{c.d}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-3xl p-10 relative overflow-hidden"
             style={{ background: "linear-gradient(135deg, hsl(195 90% 18% / 0.45), hsl(184 85% 12% / 0.45))",
                      border: "1px solid hsl(184 85% 55% / 0.25)" }}>
          <p className="text-[20px] tracking-eyebrow text-gradient mb-6">How we ensure fit quality</p>
          <div className="grid grid-cols-3 gap-8">
            {[
              { v: "33", l: "Skeletal landmarks detected from a single image" },
              { v: "3D", l: "Body reconstruction including depth & proportions" },
              { v: "11", l: "Real body measurements matched to size charts" },
            ].map((x) => (
              <div key={x.l}>
                <div className="font-display text-[100px] leading-none text-white">{x.v}</div>
                <p className="text-[20px] text-white/70 mt-4 leading-snug">{x.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
);

const Slide7 = (p: { idx: number; total: number }) => {
  const flow = ["Uncertainty", "Confidence", "Preference", "Loyalty"];
  const metrics = [
    { v: "↑ 15–25%", l: "Conversion rate" },
    { v: "↓ 20–30%", l: "Return rate" },
    { v: "↑ 10–15%", l: "Average order value" },
    { v: "↑ 20–35%", l: "Repeat purchase rate" },
    { v: "↑ 18–28%", l: "Customer retention" },
  ];
  return (
    <SlideShell index={p.idx} total={p.total} eyebrow="The Vision">
      <div className="flex flex-col flex-1">
        <h2 className="font-display text-[80px] leading-[0.95] text-white max-w-[1500px]">
          Not just better sizing —<br />
          <span className="italic text-gradient">a shift in shopper behaviour.</span>
        </h2>

        <div className="flex items-center gap-3 mt-14 mb-14">
          {flow.map((f, i) => (
            <div key={f} className="flex items-center gap-3">
              <div
                className={`px-7 py-4 rounded-full text-[24px] font-medium ${
                  i === flow.length - 1
                    ? "bg-brand-gradient text-background"
                    : "panel text-white"
                }`}
              >
                {f}
              </div>
              {i < flow.length - 1 && (
                <span className="text-[28px] text-gradient">→</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-[22px] text-white/55 tracking-eyebrow mb-6">Expected benchmark metrics</p>
        <div className="grid grid-cols-5 gap-5 flex-1">
          {metrics.map((m) => (
            <div key={m.l} className="panel rounded-2xl p-7 flex flex-col justify-between">
              <div className="font-display text-[64px] leading-none text-gradient">{m.v}</div>
              <p className="text-[22px] text-white/75 leading-tight mt-6">{m.l}</p>
            </div>
          ))}
        </div>

        <p className="text-[22px] text-white/60 font-light italic mt-10 max-w-[1500px]">
          Not by forcing behaviour — but by removing uncertainty from the purchase decision.
          This creates a <span className="text-white not-italic">preference layer</span>, not just a feature.
        </p>
      </div>
    </SlideShell>
  );
};

const Slide8 = (p: { idx: number; total: number }) => {
  const kpis = ["Conversion rate uplift", "Return rate reduction", "AOV impact", "Cart abandonment reduction", "Shopper engagement & repeat usage"];
  const incl = ["Size & fit recommendations", "Virtual try-on", "Outfit recommendations", "Persistent shopper identity (Figura ID)"];
  return (
    <SlideShell index={p.idx} total={p.total} eyebrow="Pilot Structure">
      <div className="flex flex-col flex-1">
        <h2 className="font-display text-[80px] leading-[0.95] text-white max-w-[1600px]">
          Designed for fast deployment and <span className="italic text-gradient">measurable commercial impact.</span>
        </h2>

        <div className="grid grid-cols-12 gap-8 mt-14 flex-1">
          <div className="col-span-4 panel rounded-2xl p-9 flex flex-col">
            <span className="text-[20px] tracking-eyebrow text-gradient mb-6">Pilot Setup</span>
            <ul className="space-y-5 text-[22px] text-white/85 leading-snug">
              <li className="flex gap-4"><span className="text-gradient">→</span> A/B tested across selected products, categories, or traffic segments</li>
              <li className="flex gap-4"><span className="text-gradient">→</span> Lightweight integration with minimal operational overhead</li>
              <li className="flex gap-4"><span className="text-gradient">→</span> Real-time measurement of shopper interaction & downstream behaviour</li>
            </ul>
          </div>

          <div className="col-span-4 panel rounded-2xl p-9 flex flex-col">
            <span className="text-[20px] tracking-eyebrow text-gradient mb-6">Core KPIs</span>
            <ul className="space-y-4 text-[22px] text-white/85">
              {kpis.map((k, i) => (
                <li key={k} className="flex items-baseline gap-4 border-b border-white/10 pb-3 last:border-0">
                  <span className="font-display text-[24px] text-white/40 w-[40px]">{String(i+1).padStart(2,"0")}</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 rounded-2xl p-9 flex flex-col"
               style={{ background: "linear-gradient(160deg, hsl(184 85% 18% / 0.6), hsl(200 90% 14% / 0.5))",
                        border: "1px solid hsl(184 85% 55% / 0.35)" }}>
            <span className="text-[20px] tracking-eyebrow text-white mb-6">Pilot Includes</span>
            <ul className="space-y-5 text-[22px] text-white">
              {incl.map((i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <div className="font-display text-[42px] text-white leading-tight">Low friction for shoppers.</div>
              <div className="font-display text-[42px] text-gradient italic leading-tight">Clear ROI for retailers.</div>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

/* ===================== PRESENTATION SHELL ===================== */

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];

const ScaledSlide = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setScale(Math.min(clientWidth / 1920, clientHeight / 1080));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-background">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: 1920,
          height: 1080,
          marginLeft: -960,
          marginTop: -540,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default function Presentation() {
  const [i, setI] = useState(0);
  const total = SLIDES.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") setI((p) => Math.min(p + 1, total - 1));
      if (e.key === "ArrowLeft" || e.key === "PageUp") setI((p) => Math.max(p - 1, 0));
      if (e.key === "Home") setI(0);
      if (e.key === "End") setI(total - 1);
      if (e.key === "f" || e.key === "F") toggleFs();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const toggleFs = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const Current = SLIDES[i];

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <div className="flex-1 relative">
        <ScaledSlide>
          <Current idx={i + 1} total={total} />
        </ScaledSlide>

        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 panel rounded-full px-3 py-2 z-50">
          <button
            onClick={() => setI((p) => Math.max(p - 1, 0))}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 transition disabled:opacity-30"
            disabled={i === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1.5 px-3">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-brand-gradient" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((p) => Math.min(p + 1, total - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 transition disabled:opacity-30"
            disabled={i === total - 1}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button
            onClick={toggleFs}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 transition"
            aria-label="Toggle fullscreen"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
