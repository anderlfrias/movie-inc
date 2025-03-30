import React from "react";
import { Text, StyleSheet, Pressable, FlatList } from "react-native";

const GenreTag = ({ genre, color = "#9ca3af" }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.tag,
        { borderColor: color },
        pressed && styles.pressed, // Efecto visual al presionar
      ]}
    >
      <Text style={[styles.text, { color: color }]}>{genre}</Text>
    </Pressable>
  );
};

const GenresList = ({ genres }) => {
  const renderItem = ({ item }) => {
    return <GenreTag genre={item.name} />;
  };

  return (
    <FlatList
      data={genres}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1, // Borde visible
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.6, // Efecto de opacidad al presionar
  },
});

export default GenresList;
