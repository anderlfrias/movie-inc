import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import withAnimation from "../hocs/withAnimation";

const MovieCard = ({ movie }) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/${movie.id}`)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#444" : "#222",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: movie.poster.url }}
          style={{
            width: 107,
            height: 147,
            borderRadius: 5,
          }}
        />
        <View>
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
        </View>
      </View>
    </Pressable>
  );
};

export default withAnimation(MovieCard);
