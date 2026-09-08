import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Shield,
  Globe,
  LetterText,
  Banknote,
  File,
  Box,
  Terminal,
  Link2,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const tools = [
  { name: "Link Shortener", link: "https://linko.gt.tc", icon: Link2, desc: "Shorten and share URLs", external: true },
  { name: "File Sharing", link: "/kit/share-file", icon: File, desc: "Upload and share files" },
  { name: "Mobile Banking", link: "/kit/mobile-banking", icon: Banknote, desc: "Calculate transaction fees" },
  { name: "QR Generator", link: "/kit/qrcode", icon: Box, desc: "Create custom QR codes" },
  { name: "Byte Converter", link: "/kit/byte-converter", icon: Zap, desc: "Convert data units" },
  { name: "JSON Size", link: "/kit/json-size-calculator", icon: File, desc: "Calculate JSON size" },
];

const principles = [
  { code: "01", icon: Zap, title: "Instant", desc: "Open, use, done. Latency stays near zero." },
  { code: "02", icon: Shield, title: "Private", desc: "No accounts required. Your data stays yours." },
  { code: "03", icon: Globe, title: "Everywhere", desc: "Desktop, tablet, or phone — same sharp experience." },
];

export default async function Home() {
  return (
    <div className="futuristic-surface min-h-screen text-[var(--futuristic-ink)]">
      {/* Animated hero */}
      <section className="relative min-h-[min(78vh,680px)] overflow-hidden border-b border-slate-200/80">
        <div
          className="pointer-events-none absolute inset-0 animate-mesh-shift opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(45,212,191,0.28), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 30%, rgba(56,189,248,0.22), transparent 55%), radial-gradient(ellipse 45% 35% at 10% 70%, rgba(20,184,166,0.18), transparent 50%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 futuristic-grid animate-grid-pan opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_35%,transparent_100%)]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.2),transparent_68%)] animate-horizon-drift" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <div className="relative h-[min(62vw,360px)] w-[min(62vw,360px)] animate-float-soft">
            <div className="absolute inset-0 rounded-full border border-teal-500/25 animate-orbit-spin" />
            <div className="absolute inset-[12%] rounded-full border border-dashed border-sky-400/30 animate-orbit-spin-reverse" />
            <div className="absolute inset-[28%] rounded-full border border-teal-600/20" />
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-teal-500 animate-node-pulse" />
            <div className="absolute bottom-[18%] right-[8%] h-1.5 w-1.5 rounded-full bg-sky-500 animate-node-pulse [animation-delay:0.8s]" />
            <div className="absolute left-[10%] top-[42%] h-1.5 w-1.5 rounded-full bg-teal-400 animate-node-pulse [animation-delay:1.4s]" />
            <div className="absolute inset-0 overflow-hidden rounded-full opacity-35">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-teal-400/25 to-transparent animate-scanline" />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(78vh,680px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-16 md:justify-center md:pb-16">
          <div className="max-w-xl">
            <p className={`${display.className} text-5xl font-bold tracking-tight text-slate-900 animate-fade-in-up md:text-7xl`}>
              Web<span className="text-teal-600">Kits</span>
            </p>
            <h1 className={`${display.className} mt-3 text-xl font-medium tracking-tight text-slate-700 animate-fade-in-up md:text-2xl [animation-delay:0.1s] [animation-fill-mode:both]`}>
              Tools for the next era of the web
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 animate-fade-in-up md:text-base [animation-delay:0.2s] [animation-fill-mode:both]">
              Instant utilities. No accounts. Built for speed in a connected world.
            </p>
            <div className="mt-8 animate-fade-in-up [animation-delay:0.3s] [animation-fill-mode:both]">
              <Link
                href="/kit"
                className="inline-flex items-center gap-2 border border-slate-300 bg-white/75 px-5 py-2.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition-colors hover:border-teal-400 hover:text-teal-700"
              >
                Open Kit Index
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Split body — matches kit index language */}
      <div className="mx-auto grid max-w-6xl md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-200/80 md:block">
          <nav className="sticky top-16 space-y-1 px-0 py-8">
            {[
              { href: "#share", label: "Launch pad", code: "01" },
              { href: "#featured", label: "Featured", code: "02" },
              { href: "#principles", label: "Principles", code: "03" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${display.className} flex items-baseline gap-3 border-l-2 border-transparent px-5 py-2.5 text-sm text-slate-500 transition-colors hover:border-l-teal-400 hover:bg-white/50 hover:text-teal-800`}
              >
                <span className="text-[11px] tabular-nums text-teal-600/80">{item.code}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          {/* Share Text | Linux Panel CTAs */}
          <section id="share" className="scroll-mt-20 border-b border-slate-200/80 px-4 py-8 md:px-8 md:py-10">
            <div className="mb-4 flex items-baseline gap-3">
              <span className={`${display.className} text-xs font-medium tabular-nums text-teal-600`}>01</span>
              <h2 className={`${display.className} text-sm font-medium uppercase tracking-[0.12em] text-slate-500`}>
                Launch pad
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/kit/share-text"
                className="group animate-banner-border relative flex flex-col gap-5 overflow-hidden border bg-gradient-to-br from-teal-50 via-white to-sky-50/70 p-5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-banner-sheen" />
                </div>
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-teal-600 text-white animate-float-soft">
                    <LetterText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`${display.className} text-xl font-semibold text-slate-900`}>Share Text</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Drop code or notes, get a shareable link in seconds.
                    </p>
                  </div>
                </div>
                <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-all group-hover:gap-3">
                  Open
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <a
                href="https://lxwebgui.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-5 overflow-hidden border border-slate-800 bg-slate-950 p-5 text-slate-100 transition-transform duration-300 hover:-translate-y-0.5 hover:border-teal-400"
              >
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 futuristic-grid opacity-20" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-teal-500 text-slate-950">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`${display.className} text-xl font-semibold text-white`}>Linux Panel</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Open the Linux web GUI panel in a new tab.
                    </p>
                  </div>
                </div>
                <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-teal-400 transition-all group-hover:gap-3">
                  Open
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </section>

          {/* Featured tiles */}
          <section id="featured" className="scroll-mt-20 border-b border-slate-200/80 px-4 py-8 md:px-8 md:py-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className={`${display.className} text-xs font-medium tabular-nums text-teal-600`}>02</span>
                  <h2 className={`${display.className} text-xl font-semibold text-slate-900`}>Featured kits</h2>
                </div>
                <p className="mt-1 text-sm text-slate-500">Utilities tuned for everyday work</p>
              </div>
              <Link
                href="/kit"
                className={`${display.className} hidden items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-600 sm:inline-flex`}
              >
                Full index <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool, i) => {
                const className =
                  "group relative flex min-h-[132px] flex-col justify-between border border-slate-200/90 bg-white/75 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50/40";
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-slate-950 text-teal-300 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] tabular-nums text-slate-300 group-hover:text-teal-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-6 flex items-end justify-between gap-2">
                      <div>
                        <h3 className={`${display.className} text-sm font-semibold text-slate-900 group-hover:text-teal-900`}>
                          {tool.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500">{tool.desc}</p>
                      </div>
                      <ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-600" />
                    </div>
                  </>
                );

                if (tool.external) {
                  return (
                    <a
                      key={tool.name}
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link key={tool.name} href={tool.link} className={className}>
                    {content}
                  </Link>
                );
              })}
            </div>
            <div className="mt-5 sm:hidden">
              <Link href="/kit" className="text-sm font-medium text-teal-700">
                View full kit index →
              </Link>
            </div>
          </section>

          {/* Principles */}
          <section id="principles" className="scroll-mt-20 bg-slate-950 px-4 py-10 text-slate-100 md:px-8 md:py-12">
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className={`${display.className} text-xs font-medium tabular-nums text-teal-400`}>03</span>
                <h2 className={`${display.className} text-xl font-semibold`}>Principles</h2>
              </div>
              <p className="mt-1 text-sm text-slate-400">Quiet power. Tools that stay out of your way.</p>
            </div>
            <div className="space-y-0 divide-y divide-slate-800 border-y border-slate-800">
              {principles.map((item) => (
                <div key={item.code} className="flex gap-4 py-5 md:gap-6">
                  <span className={`${display.className} w-8 shrink-0 text-xs tabular-nums text-teal-500`}>
                    {item.code}
                  </span>
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                  <div>
                    <h3 className={`${display.className} font-semibold`}>{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/kit"
                className="inline-flex items-center gap-2 bg-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-teal-400"
              >
                Browse all tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
