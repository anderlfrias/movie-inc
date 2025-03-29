import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function MovieRating({ movieId }) {
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("MovieRating", userRating);

  const handleRating = (rating) => {
    console.log("handleRating", rating);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Calificación</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable key={star} onPress={() => handleRating(star)}>
            <Text
              style={[
                styles.star,
                { color: star <= userRating ? "#FFD700" : "#D3D3D3" }, // Dorado si seleccionado, gris si no
              ]}
            >
              ★
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    color: "#FFD700", // Dorado para las estrellas
    marginHorizontal: 5,
  },
});
