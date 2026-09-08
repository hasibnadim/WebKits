import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CashOutCalculator from './_CashOutCalc'
import KitLayout from '@/components/KitLayout'

const page = () => (
  <KitLayout>
    <Tabs defaultValue="rocket" className="space-y-4">
      <TabsList className="flex w-full gap-1 border border-slate-200 bg-slate-50 p-1">
        <TabsTrigger value="rocket" className="flex-1 rounded-none px-2 py-1.5 text-xs data-[state=active]:bg-slate-950 data-[state=active]:text-teal-300">Rocket</TabsTrigger>
        <TabsTrigger value="bkash" className="flex-1 rounded-none px-2 py-1.5 text-xs data-[state=active]:bg-slate-950 data-[state=active]:text-teal-300">Bkash</TabsTrigger>
        <TabsTrigger value="nagad" className="flex-1 rounded-none px-2 py-1.5 text-xs data-[state=active]:bg-slate-950 data-[state=active]:text-teal-300">Nagad</TabsTrigger>
      </TabsList>
      <TabsContent value="rocket">
        <CashOutCalculator title="Rocket Cashout Calculator" defaultRate={0.0167} altRate={0.009} altLabel="ATM Booth" />
      </TabsContent>
      <TabsContent value="bkash">
        <CashOutCalculator title="bKash Cashout Calculator" defaultRate={0.0185} altRate={0.0149} altLabel="Priyo Number" />
      </TabsContent>
      <TabsContent value="nagad">
        <CashOutCalculator title="Nagad Cashout Calculator" defaultRate={0.0125} altRate={0.0150} altLabel="Islami Account" />
      </TabsContent>
    </Tabs>
  </KitLayout>
)
export default page
