import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMovieDetails } from "../../hooks/useMoviesDetails";
import ScreenLayout from "../../components/screen-layout";
import DefaultActorIcon from "../../assets/favicon.png";
import MovieRating from "../../components/movie/rating";
import useAuth from "../../hooks/useAuth";
import { rateMovieAsGuest } from "../../api/movie";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { getGuestSession } = useAuth();
  const { movie, loading, actors, refetch } = useMovieDetails(id);

  const rateMovie = async (rating) => {
    const guestSession = await getGuestSession();
    const resp = await rateMovieAsGuest(
      id,
      rating,
      guestSession.guest_session_id,
    );
    console.log("rateMovie", resp);

    if (resp.success) {
      console.log("Calificación exitosa");
      refetch();
    }
    if (resp.error) {
      console.log("Error al calificar la película", resp.error);
    }
    return resp;
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
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // eslint-disable-next-line prettier/prettier
          headerLeft: () => { },
          // eslint-disable-next-line prettier/prettier
          headerRight: () => { },
          headerBackTitleVisible: false,
        }}
      />
      <ScrollView>
        <View style={styles.posterContainer}>
          <Image source={{ uri: movie.poster.url }} style={styles.poster} />
        </View>

        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.year}</Text>

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

        <MovieRating movieId={id} onRateMovie={rateMovie} />

        <View style={styles.actorsCard}>
          <Text style={styles.sectionTitle}>Actores</Text>
          <FlatList
            data={actors} // Limitamos a 10 actores
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
    color: "#fff",
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
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  voteCount: {
    fontSize: 14,
    color: "#666",
  },
});
