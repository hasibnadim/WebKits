import KitLayout from "@/components/KitLayout";
import ByteConverter from "./ByteConverter";

const Page = () => (
  <KitLayout
    title="Byte Converter"
    description="Convert between different data storage units"
    category="Conversion Kit"
  >
    <ByteConverter />
  </KitLayout>
);

export default Page;
