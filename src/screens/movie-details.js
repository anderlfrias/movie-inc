import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMovieDetails } from "../hooks/useMoviesDetails";
import ScreenLayout from "../components/screen-layout";
import { SharedElement } from "react-native-shared-element";
import GenresList from "../components/movie/genres";
import ActorList from "../components/movie/actors";
import Rating from "../components/movie/rating";
import RateMovie from "../components/movie/rate";
import MovieRecomendations from "../components/movie/recomendations";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { movie, loading } = useMovieDetails(id);

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
    <ScreenLayout loading={loading} styles={{ paddingHorizontal: 0 }}>
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
        <Image
          source={{
            uri: movie.backdrop.url,
          }}
          style={{ width: "100%", height: 200, objectFit: "cover" }}
        />
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <SharedElement id={`movie.${movie.id}.image`}>
              <Image
                source={{
                  uri: movie.poster.url,
                }}
                style={styles.poster}
              />
            </SharedElement>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: 4,
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {movie.title}
              </Text>

              <Text style={styles.year} numberOfLines={1}>
                {movie.year}
              </Text>
              <Rating
                average={movie.vote.average}
                count={movie.vote.count}
                showVotes
              />
            </View>
          </View>

          <GenresList genres={movie.genres} />

          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Sinopsis
            </Text>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              {movie.overview}
            </Text>
          </View>

          <View style={{ marginBottom: 32 }}>
            <RateMovie movieId={id} />
          </View>

          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Actores
            </Text>
            <ActorList actors={movie.actors} />
          </View>

          <MovieRecomendations movieId={id} />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: -60,
  },
  year: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  star: {
    marginRight: 5,
    color: "#FFD700",
  },
});

MovieDetailsScreen.sharedElements = (route) => {
  return [
    {
      id: `movie.${route.params.id}.image`,
      animation: "move",
      resize: "clip",
      align: "left-top",
    },
  ];
};
