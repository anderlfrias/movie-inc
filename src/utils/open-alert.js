import { Alert } from "react-native";

const openAlert = (
  title = "Error",
  message = "Ocurrió un error inesperado",
) => {
  Alert.alert(
    title,
    message,
    [{ text: "OK", onPress: () => console.log("Alerta cerrada") }],
    { cancelable: true },
  );
};

export default openAlert;
