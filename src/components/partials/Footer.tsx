import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(45,212,191,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.12)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-end md:justify-between md:py-10">
        <div>
          <Link
            href="/"
            className={`${display.className} text-lg font-semibold tracking-tight text-white transition-colors hover:text-teal-300`}
          >
            Web<span className="text-teal-400">Kits</span>
          </Link>
          <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-slate-400">
            Free online tools for developers and creators.
          </p>
        </div>

        <div className={`${display.className} flex items-center gap-5 text-sm`}>
          <Link href="/kit" className="text-slate-400 transition-colors hover:text-teal-300">
            Kits
          </Link>
          <Link href="/about" className="text-slate-400 transition-colors hover:text-teal-300">
            About
          </Link>
        </div>

        <p className="text-[11px] text-slate-500">
          Built by{" "}
          <a
            href="https://hnadim.web.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal-400/90 transition-colors hover:text-teal-300"
          >
            H.Nadim
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
