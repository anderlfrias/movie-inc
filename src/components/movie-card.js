import { Image, Pressable, Text } from "react-native";

export default function MovieCard({ movie, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ marginBottom: 20 }}>
      <Image
        source={{ uri: movie.poster.url }}
        style={{
          width: 107,
          height: 147,
          borderRadius: 5,
        }}
      />
      <Text
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {movie.title}
      </Text>
      <Text style={{ color: "#fff" }}>Estreno: {movie.releaseDate}</Text>
      <Text style={{ color: "#fff" }}>
        Calificación: {movie.vote.average}/10
      </Text>
    </Pressable>
  );
}
