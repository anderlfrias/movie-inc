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
import useAuth from "../hooks/useAuth";
import { useMovieDetails } from "../hooks/useMoviesDetails";
import { rateMovieAsGuest } from "../api/movie";
import ScreenLayout from "../components/screen-layout";
import MovieRating from "../components/movie/rating";
import DefaultActorIcon from "../assets/favicon.png";
import { SharedElement } from "react-native-shared-element";
import { StarIcon } from "../components/icons";
import GenresList from "../components/movie/genres";
import ActorList from "../components/movie/actors";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getGuestSession } = useAuth();
  const { movie, loading, refetch } = useMovieDetails(id);

  const rateMovie = async (rating) => {
    const guestSession = await getGuestSession();
    const resp = await rateMovieAsGuest(
      id,
      rating,
      guestSession.guest_session_id,
    );

    if (resp.success) {
      refetch();
    }
    if (resp.error) {
      console.log("Error al calificar la película", resp.error);
    }
    return resp;
  };

  // console.log("MovieDetailsScreen", movie?.actors);

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

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.star}>
                  <StarIcon color={"#FFD700"} size={16} />
                </Text>
                <Text style={styles.rating}>{movie.vote.average}</Text>
              </View>
            </View>
          </View>

          <GenresList genres={movie.genres} />

          <View style={{ marginBottom: 16 }}>
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

          <View>
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
        </View>

        {/* <Text
          style={{
            color: "#fff",
            fontFamily: "monospace",
            fontSize: 16,
          }}
        >
          {JSON.stringify(movie.actors, null, 2)}{" "}
        </Text> */}
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
