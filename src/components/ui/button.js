import { Pressable, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton, // Cambia de color al presionar
        style, // Estilos adicionales desde props
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pressedButton: {
    backgroundColor: "#E6B400", // Un dorado más oscuro al presionar
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
