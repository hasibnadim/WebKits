import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import CashOutCalculator from './_CashOutCalc'
import KitLayout from '@/components/KitLayout'

const page = () => (
  <KitLayout title="Transaction Fee Calculator" description="Calculate transaction fees for mobile banking platforms" category="Conversion Kit">
    <Tabs defaultValue="rocket">
      <TabsList className="w-full flex justify-between bg-white border border-gray-200 rounded-lg p-1 gap-1">
        <TabsTrigger value="rocket" className="flex-1 text-xs px-2 py-1 rounded-md">Rocket</TabsTrigger>
        <TabsTrigger value="bkash" className="flex-1 text-xs px-2 py-1 rounded-md">Bkash</TabsTrigger>
        <TabsTrigger value="nagad" className="flex-1 text-xs px-2 py-1 rounded-md">Nagad</TabsTrigger>
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
