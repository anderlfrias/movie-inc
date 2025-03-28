import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/home";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <HomeScreen />
    </SafeAreaProvider>
  );
}
