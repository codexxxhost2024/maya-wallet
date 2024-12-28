import { View, Label } from '@nativescript/core';

export function PromoCard() {
  return (
    <View className="bg-white rounded-lg p-4 mx-4 mb-4 shadow">
      <Label text="50% OFF" className="font-semibold text-[16]" />
      <Label text="Summer special deal. Get discount for every transaction" className="text-gray-500 text-[14]" />
    </View>
  );
}