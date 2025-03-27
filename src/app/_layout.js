import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Layout() {
  return (
    <View>
      <StatusBar style="light" backgroundColor="#000" barStyle="light-content" />
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', height: '100%'}}>
          <Slot />
        </View>
    </View>
  );
}