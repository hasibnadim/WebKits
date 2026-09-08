import {
  Banknote,
  Calculator,
  Code,
  File,
  Key,
  LetterText,
  Link2,
  LucideProps,
  QrCode,
  Terminal,
  TypeOutline,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type KitIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type KitCategory = "General Kit" | "Conversion Kit" | "Developer Suite";

export type ApplicationTool = {
  id: string;
  name: string;
  link: string;
  description: string;
  icon: KitIcon;
  category: KitCategory;
  external?: boolean;
};

export const CATEGORY_META: Record<
  KitCategory,
  { desc: string; code: string }
> = {
  "General Kit": {
    desc: "Everyday utilities for quick tasks",
    code: "01",
  },
  "Conversion Kit": {
    desc: "Convert between formats and units",
    code: "02",
  },
  "Developer Suite": {
    desc: "Tools built for developers",
    code: "03",
  },
};

const tools: ApplicationTool[] = [
  {
    id: "share-text",
    name: "Text Sharing",
    link: "/kit/share-text",
    description: "Share code & text with a link that expires in 30 days",
    icon: LetterText,
    category: "General Kit",
  },
  {
    id: "share-file",
    name: "File Sharing",
    link: "/kit/share-file",
    description: "Upload and share a ZIP with a link that expires in 72 hours",
    icon: File,
    category: "General Kit",
  },
  {
    id: "qrcode",
    name: "QR Generator",
    link: "/kit/qrcode",
    description: "Create custom QR codes with advanced styling options",
    icon: QrCode,
    category: "General Kit",
  },
  {
    id: "mobile-banking",
    name: "Mobile Banking",
    link: "/kit/mobile-banking",
    description: "Calculate transaction fees for mobile banking platforms",
    icon: Banknote,
    category: "Conversion Kit",
  },
  {
    id: "byte-converter",
    name: "Byte Converter",
    link: "/kit/byte-converter",
    description: "Convert between different data storage units",
    icon: Calculator,
    category: "Conversion Kit",
  },
  {
    id: "link-shortener",
    name: "Link Shortener",
    link: "https://linko.gt.tc",
    description: "Shorten and share URLs",
    icon: Link2,
    category: "Conversion Kit",
    external: true,
  },
  {
    id: "linux-panel",
    name: "Linux Panel",
    link: "https://lxwebgui.web.app",
    description: "Open the Linux web GUI panel",
    icon: Terminal,
    category: "Developer Suite",
    external: true,
  },
  {
    id: "json-size-calculator",
    name: "JSON Size Calculator",
    link: "/kit/json-size-calculator",
    description: "Calculate JSON size and convert between formats",
    icon: Code,
    category: "Developer Suite",
  },
  {
    id: "text-diff-checker",
    name: "Text Diff Checker",
    link: "/kit/text-diff-checker",
    description: "Compare and visualize differences between two text versions",
    icon: TypeOutline,
    category: "Developer Suite",
  },
  {
    id: "random-key-generator",
    name: "Random Key Generator",
    link: "/kit/random-key-generator",
    description: "Generate secure random keys and passwords",
    icon: Key,
    category: "Developer Suite",
  },
];

/** Grouped by category — used by the Kit Index UI */
export const applications: Record<KitCategory, ApplicationTool[]> = {
  "General Kit": tools.filter((t) => t.category === "General Kit"),
  "Conversion Kit": tools.filter((t) => t.category === "Conversion Kit"),
  "Developer Suite": tools.filter((t) => t.category === "Developer Suite"),
};

export function getAllTools() {
  return tools;
}

export function findToolById(id: string) {
  return tools.find((t) => t.id === id);
}

export function findToolByPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return tools.find(
    (t) => !t.external && (normalized === t.link || normalized.startsWith(`${t.link}/`)),
  );
}

export default applications;
