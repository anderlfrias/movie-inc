import { Text } from "react-native";
import ScreenLayout from "../../components/screen-layout";

export default function Search() {
  return (
    <ScreenLayout>
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Search movies
      </Text>
    </ScreenLayout>
  );
}
