import KitLayout from "@/components/KitLayout";
import RandomKeyGenerator from "./RandomKeyGenerator";

const Page = () => (
  <KitLayout title="Random Key Generator" description="Generate secure random keys and passwords" category="Developer Suite">
    <RandomKeyGenerator />
  </KitLayout>
);

export default Page;
