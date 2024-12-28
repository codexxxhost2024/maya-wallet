import { View, Label } from '@nativescript/core';

export function TopNav() {
  return (
    <ScrollView orientation="horizontal" className="bg-white p-4 border-b border-gray-200">
      <StackLayout orientation="horizontal" className="gap-8">
        <Label text="Wallet" className="text-[#6CBF41] font-semibold border-b-2 border-[#6CBF41] pb-1" />
        <Label text="Savings" className="text-gray-600 font-semibold" />
        <Label text="Credit" className="text-gray-600 font-semibold" />
        <Label text="Loans" className="text-gray-600 font-semibold" />
        <Label text="Cards" className="text-gray-600 font-semibold" />
      </StackLayout>
    </ScrollView>
  );
}