import QRapp from "./QRapp";
import { Metadata } from "next";
import KitLayout from "@/components/KitLayout";

export const metadata: Metadata = {
  title: "QR Code Generator/Scanner",
  description: "Generate/Scan QR Code",
};

export default function QRCodePage() {
  return (
    <KitLayout title="QR Code Generator" description="Create custom QR codes with advanced styling options" category="General Kit">
      <div className="flex justify-center">
        <QRapp />
      </div>
    </KitLayout>
  );
}
