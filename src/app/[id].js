import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenLayout from "../components/screen-layout";
import { useMovieDetails } from "../hooks/useMoviesDetails";
import { useState } from "react";
import DefaultActorIcon from "../assets/favicon.png";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { movie, loading } = useMovieDetails(id);
  const [userRating, setUserRating] = useState(0);

  const handleRating = (rating) => {
    console.log(`Calificación seleccionada: ${rating}`);
    setUserRating(rating);
  };

  if (loading) {
    return (
      <ScreenLayout>
        <ActivityIndicator color={"#fff"} size="large" style={{ flex: 1 }} />
      </ScreenLayout>
    );
  }

  if (!movie) {
    return (
      <ScreenLayout>
        <Text style={{ color: "#fff" }}>No se encontró la película.</Text>
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout>
      <Stack.Screen
        options={{
          headerTitle: movie.title,
        }}
      />
      <ScrollView>
        {/* Póster con sombra */}
        <View style={styles.posterContainer}>
          <Image source={{ uri: movie.poster.url }} style={styles.poster} />
        </View>

        {/* Título y Año */}
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.year}</Text>

        {/* Información Principal */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Géneros</Text>
          <Text style={styles.text}>
            {movie.genres.map((g) => g.name).join(", ")}
          </Text>

          <Text style={styles.sectionTitle}>Sinopsis</Text>
          <Text style={styles.text}>{movie.overview}</Text>

          <Text style={styles.sectionTitle}>Calificación</Text>
          <Text style={styles.ratingText}>
            {movie.vote.average}/10{" "}
            <Text style={styles.voteCount}>({movie.vote.count} votos)</Text>
          </Text>
        </View>

        {/* Sistema de Votación (FF-3) */}
        <View style={styles.ratingCard}>
          <Text style={styles.sectionTitle}>Tu Calificación</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                <Text
                  style={[
                    styles.star,
                    { color: star <= userRating ? "#FFD700" : "#D3D3D3" }, // Dorado si seleccionado, gris si no
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lista de Actores */}
        <View style={styles.actorsCard}>
          <Text style={styles.sectionTitle}>Actores</Text>
          <FlatList
            data={movie.cast.slice(0, 10)} // Limitamos a 10 actores
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.actorItem}>
                {item.profile && (
                  <Image
                    source={{ uri: item.profile }}
                    style={styles.actorImage}
                  />
                )}
                {!item.profile && (
                  <Image source={DefaultActorIcon} style={styles.actorImage} />
                )}
                <View style={styles.actorInfo}>
                  <Text style={styles.actorName}>{item.name}</Text>
                  <Text style={styles.actorCharacter}>
                    como {item.character}
                  </Text>
                </View>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  poster: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  year: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
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
  actorItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  actorName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  actorCharacter: {
    fontSize: 14,
    color: "#666",
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
