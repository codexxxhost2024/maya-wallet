import { View, StyleSheet } from '@nativescript/core';
import { Image } from '@nativescript/core';

export function Header() {
  return (
    <View className="bg-[#6CBF41] p-4 flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <Image src="~/assets/images/logo/logo.png" className="w-[120] h-[45]" />
      </View>
      <View className="flex-row items-center gap-4">
        <Label text="notifications" className="material-icons text-[24] text-white" />
        <Label text="support_agent" className="material-icons text-[24] text-white" />
      </View>
    </View>
  );
}