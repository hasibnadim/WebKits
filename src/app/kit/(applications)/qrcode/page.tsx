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
        <QRapp />
      </div>
    </KitLayout>
  );
}
