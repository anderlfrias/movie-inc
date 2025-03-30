import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
const DefaultActorImage = require("../../assets/default-actor-image.png");

const ActorList = ({ actors }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.profile ? (
        <Image source={{ uri: item.profile }} style={styles.actorImage} />
      ) : (
        <Image
          source={DefaultActorImage}
          style={[styles.actorImage, { width: 80, height: 80 }]}
        />
      )}
      {/* <Image source={{ uri: item.profile }} style={styles.actorImage} /> */}
      <View style={styles.actorInfo}>
        <Text style={styles.actorName}>{item.name}</Text>
        <Text style={styles.actorCharacter}>{item.character}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={actors}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#222", // #1F1F1F
    borderRadius: 10,
    marginRight: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 150, // Tamaño de la tarjeta
  },
  actorImage: {
    width: 80,
    height: 80, // Mantiene la relación de aspecto
    borderRadius: 40, // Hace la imagen circular
    marginBottom: 8,
  },
  actorInfo: {
    alignItems: "center",
  },
  actorName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  actorCharacter: {
    color: "#aaa",
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default ActorList;
