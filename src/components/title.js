import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({
  text,
  variant = "bar",
  color = "#FFD700",
  textStyle = {},
  containerStyle = {},
}) => {
  return (
    <View
      style={[
        styles.container,
        variant === "bar" && styles.row,
        containerStyle,
      ]}
    >
      {variant === "highlight" && (
        <View
          style={[styles.highlight, { backgroundColor: color, opacity: 0.5 }]}
        />
      )}
      {variant === "bar" && (
        <View style={[styles.bar, { backgroundColor: color }]} />
      )}
      <Text style={[styles.title, textStyle]}>{text}</Text>
      {variant === "underline" && (
        <View style={[styles.underline, { backgroundColor: color }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row", // Para alinear la barra con el texto
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    position: "relative",
  },
  underline: {
    width: 50,
    height: 4,
    marginTop: 4,
    borderRadius: 2,
  },
  highlight: {
    position: "absolute",
    bottom: 4,
    left: 0,
    width: "60%",
    height: 10,
    borderRadius: 4,
  },
  bar: {
    width: 5, // Grosor de la barra vertical
    height: 24, // Misma altura del texto
    marginRight: 8, // Espacio entre la barra y el texto
    borderRadius: 2,
  },
});

export default Title;
