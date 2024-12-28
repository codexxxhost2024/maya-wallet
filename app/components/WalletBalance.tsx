import { View, Label, Button } from '@nativescript/core';

interface WalletBalanceProps {
  balance: string;
  onCashIn: () => void;
  onTransfer: () => void;
}

export function WalletBalance({ balance, onCashIn, onTransfer }: WalletBalanceProps) {
  return (
    <View className="bg-white rounded-lg p-4 m-4 shadow">
      <Label text={balance} className="text-[32] font-bold" />
      <Label text="Available balance" className="text-gray-500 text-[14]" />
      <FlexboxLayout className="mt-4 gap-4">
        <Button text="Cash In" className="bg-[#6CBF41] text-white flex-1 p-3 rounded-lg" tap={onCashIn} />
        <Button text="Transfer" className="bg-[#6CBF41] text-white flex-1 p-3 rounded-lg" tap={onTransfer} />
      </FlexboxLayout>
    </View>
  );
}