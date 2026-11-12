import { Suspense } from "react";
import QRapp from "./QRapp";
import { Metadata } from "next";
import KitLayout from "@/components/KitLayout";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate custom QR codes",
};

export default function QRCodePage() {
  return (
    <KitLayout>
      <div className="flex justify-center">
        <Suspense fallback={<div className="flex h-64 items-center justify-center text-slate-400">Loading...</div>}>
          <QRapp />
        </Suspense>
      </div>
    </KitLayout>
  );
}
