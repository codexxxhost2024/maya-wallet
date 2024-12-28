import { View, Label, ScrollView } from '@nativescript/core';

export function RecentTransactions() {
  return (
    <View className="mx-4 mt-4">
      <FlexboxLayout className="justify-between items-center mb-2">
        <Label text="Recent Transaction" className="font-semibold" />
        <Label text="See All" className="text-[#6CBF41] text-[12]" />
      </FlexboxLayout>
      <View className="bg-[#FAFAFA] rounded p-3 flex-row justify-between">
        <Label text="No transactions yet" className="text-[14]" />
        <Label text="---" className="font-bold text-[14]" />
      </View>
    </View>
  );
}