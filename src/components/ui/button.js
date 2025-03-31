import { Pressable, Text, StyleSheet, View } from "react-native";

export default function Button({ title, onPress, style, icon, textStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton, // Cambia de color al presionar
        style, // Estilos adicionales desde props
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
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
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8, // Espaciado entre el icono y el texto
  },
});
