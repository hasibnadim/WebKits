import Link from "next/link";
import {
  ArrowUpRight,
  Package,
  Users,
  Code,
  Shield,
  Zap,
  Gift,
} from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const principles = [
  { code: "01", icon: Package, title: "Curated Tools", description: "Handpicked utilities for everyday tasks" },
  { code: "02", icon: Users, title: "Community Driven", description: "Built for developers and creators" },
  { code: "03", icon: Code, title: "Developer Focus", description: "Tools that developers actually need" },
  { code: "04", icon: Shield, title: "Privacy First", description: "No tracking, no accounts, no nonsense" },
  { code: "05", icon: Zap, title: "Lightning Fast", description: "Optimized for speed and efficiency" },
  { code: "06", icon: Gift, title: "Always Free", description: "All tools available at no cost" },
];

export default function AboutPage() {
  return (
    <div className="futuristic-surface min-h-screen text-[var(--futuristic-ink)]">
      {/* Command bar */}
      <div className="border-b border-slate-200/80 bg-white/55 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 md:flex-row md:items-end md:justify-between md:py-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal-700">Manifest</p>
            <h1 className={`${display.className} mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl`}>
              About Web<span className="text-teal-600">Kits</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm text-slate-500">
            Free tools. No signup. No data collected.
          </p>
        </div>
      </div>

      {/* Split: rail + content */}
      <div className="mx-auto grid max-w-6xl md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200/80 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:border-b-0 md:border-r md:border-slate-200/80">
          <nav className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none md:flex-col md:gap-0 md:overflow-visible md:px-0 md:py-6 [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { href: "#mission", label: "Mission", code: "01" },
              { href: "#principles", label: "Principles", code: "02" },
              { href: "#contact", label: "Contact", code: "03" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${display.className} shrink-0 border border-slate-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-teal-300 hover:text-teal-700 md:border-0 md:border-l-2 md:border-l-transparent md:bg-transparent md:px-5 md:py-2.5 md:hover:border-l-teal-400 md:hover:bg-white/50`}
              >
                <span className="hidden text-[11px] tabular-nums text-teal-600 md:mr-3 md:inline">
                  {item.code}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          <section id="mission" className="scroll-mt-20 border-b border-slate-200/80 px-4 py-8 md:px-8 md:py-10">
            <div className="mb-4 flex items-baseline gap-3">
              <span className={`${display.className} text-xs font-medium tabular-nums text-teal-600`}>01</span>
              <h2 className={`${display.className} text-xl font-semibold text-slate-900`}>Mission</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              We believe powerful tools should be accessible to everyone. WebKits brings together
              a carefully curated set of utilities that developers and creators need most—text sharing,
              file handling, QR codes, and more. All free, forever.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Accounts", value: "None" },
                { label: "Tracking", value: "Zero" },
                { label: "Cost", value: "Free" },
              ].map((stat) => (
                <div key={stat.label} className="border border-slate-200/90 bg-white/70 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{stat.label}</p>
                  <p className={`${display.className} mt-1 text-lg font-semibold text-slate-900`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="principles" className="scroll-mt-20 border-b border-slate-200/80 px-4 py-8 md:px-8 md:py-10">
            <div className="mb-5 flex items-baseline gap-3">
              <span className={`${display.className} text-xs font-medium tabular-nums text-teal-600`}>02</span>
              <h2 className={`${display.className} text-xl font-semibold text-slate-900`}>Principles</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {principles.map((item) => (
                <div
                  key={item.code}
                  className="flex min-h-[120px] flex-col justify-between border border-slate-200/90 bg-white/75 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-slate-950 text-teal-300">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className={`${display.className} text-[11px] tabular-nums text-slate-300`}>
                      {item.code}
                    </span>
                  </div>
                  <div className="mt-5">
                    <h3 className={`${display.className} text-sm font-semibold text-slate-900`}>{item.title}</h3>
                    <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="scroll-mt-20 px-4 py-8 md:px-8 md:py-10">
            <div className="mb-4 flex items-baseline gap-3">
              <span className={`${display.className} text-xs font-medium tabular-nums text-teal-600`}>03</span>
              <h2 className={`${display.className} text-xl font-semibold text-slate-900`}>Contact</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Have questions or suggestions? We&apos;d love to hear from you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-teal-400 hover:text-teal-700"
              >
                Back to Home
              </Link>
              <Link
                href="/kit"
                className="inline-flex items-center gap-2 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-teal-300 transition-colors hover:bg-teal-600 hover:text-white"
              >
                Open Kit Index
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="https://hnadim.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-teal-200 bg-teal-50/60 px-4 py-2.5 text-sm font-semibold text-teal-800 transition-colors hover:border-teal-400"
              >
                H.Nadim
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
