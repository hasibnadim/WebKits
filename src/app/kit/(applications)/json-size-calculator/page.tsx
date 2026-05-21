import KitLayout from "@/components/KitLayout";
import JsonSizeCalculator from "./JsonSizeCalculator";

const Page = () => (
  <KitLayout title="JSON Size Calculator" description="Calculate JSON size and convert between formats" category="Developer Suite">
    <JsonSizeCalculator />
  </KitLayout>
);

export default Page;
