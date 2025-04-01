import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import withAnimation from "../../hocs/withAnimation";
import { formatReleaseDate } from "../../utils/date";
import { SharedElement } from "react-native-shared-element";
import Rating from "./rating";
import MoviePoster from "./poster";

const MovieCard = ({ movie }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/movies/${movie.id}`)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#444" : "#222",
          ...styles.container,
        },
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <SharedElement id={`movie.${movie.id}.image`}>
            <MoviePoster movie={movie} style={styles.poster} />
          </SharedElement>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {formatReleaseDate(movie.releaseDate)}
          </Text>

          <Rating average={movie.vote.average} count={movie.vote.count} />
        </View>
      </View>
    </Pressable>
  );
};

export default withAnimation(MovieCard);

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "visible",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
  },
  imageContainer: {
    marginRight: 12,
    marginBottom: 8,
    marginTop: -40,
  },
  poster: {
    width: 107,
    height: 147,
    borderRadius: 8,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#d1d5db",
    marginBottom: 4,
  },
});
