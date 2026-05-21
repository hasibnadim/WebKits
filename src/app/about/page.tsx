import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Users, Code, Shield, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: Package,
      title: "Curated Tools",
      description: "Handpicked utilities for everyday tasks"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built for developers and creators"
    },
    {
      icon: Code,
      title: "Developer Focus",
      description: "Tools that developers actually need"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "No tracking, no accounts, no nonsense"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and efficiency"
    },
    {
      icon: Package,
      title: "Always Free",
      description: "All tools available at no cost"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-slate-200 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-900">About WebKits</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Kits</span>
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            A curated collection of free online tools designed for developers and creators. 
            No signup required, no data collected—just fast, reliable utilities.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8 border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="w-5 h-5 text-blue-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              We believe powerful tools should be accessible to everyone. WebKits brings together 
              a carefully curated set of utilities that developers and creators need most—text sharing, 
              file handling, QR codes, and more. All free, forever.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Have questions or suggestions? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}