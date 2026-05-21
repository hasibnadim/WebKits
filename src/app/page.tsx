import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  LetterText,
  Banknote,
  File,
  ChevronRight,
  Sparkles,
  Box,
} from "lucide-react";

const tools = [
  { name: "Text Sharing", link: "/kit/share-text", icon: LetterText, desc: "Share code & text instantly" },
  { name: "File Sharing", link: "/kit/share-file", icon: File, desc: "Upload and share files" },
  { name: "Mobile Banking", link: "/kit/mobile-banking", icon: Banknote, desc: "Calculate transaction fees" },
  { name: "QR Generator", link: "/kit/qrcode", icon: Box, desc: "Create custom QR codes" },
  { name: "Byte Converter", link: "/kit/byte-converter", icon: Zap, desc: "Convert data units" },
  { name: "JSON Size", link: "/kit/json-size-calculator", icon: File, desc: "Calculate JSON size" },
];

export default async function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="container mx-auto px-4 py-14 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1 mb-5">
              <Sparkles className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Free online tools for everyone</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4">
              Web<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Kits</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
              A curated collection of professional tools. Fast and free.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/kit"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Explore Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Tools</h2>
                <p className="text-gray-500 mt-1">Quick access to our most popular utilities</p>
              </div>
              <Link
                href="/kit"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.link}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm hover:bg-blue-50/30 transition-all duration-200"
                >
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                    <tool.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{tool.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/kit"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All Tools <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Tools" },
              { value: "100%", label: "Free" },
              { value: "Zero", label: "Signups" },
              { value: "Fast", label: "Performance" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900">Why WebKits?</h2>
              <p className="text-gray-500 mt-3 max-w-lg mx-auto">
                Built with simplicity and performance in mind
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Blazing Fast",
                  desc: "No bloat, no delays. Tools that work as fast as you do.",
                },
                {
                  icon: Shield,
                  title: "Privacy First",
                  desc: "No accounts, no tracking. Your data stays yours.",
                },
                {
                  icon: Globe,
                  title: "Universal Access",
                  desc: "Works everywhere. Desktop, tablet, or phone.",
                },
              ].map((feat) => (
                <div key={feat.title} className="text-center p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <feat.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Using Tools Now</h2>
            <p className="text-gray-400 mb-8">
              No registration. No downloads. Just working tools.
            </p>
            <Link
              href="/kit"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}