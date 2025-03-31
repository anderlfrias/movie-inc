import { Pressable, StyleSheet, View } from "react-native";
import Title from "../../components/title";
import { StarIcon } from "../icons";
import { useRateMovie } from "../../hooks/useRateMovie";

export default function RateMovie({ movieId }) {
  const { userRating, rateMovie } = useRateMovie(movieId);

  const handleRating = (rating) => {
    rateMovie(rating);
  };

  return (
    <View style={styles.ratingCard}>
      <Title
        text="Califica esta película"
        textStyle={{ fontSize: 20 }}
        containerStyle={{ marginBottom: 12 }}
      />
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <Pressable
            key={star}
            onPress={() => handleRating(star)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.9 : 1 }],
              },
            ]}
          >
            <StarIcon
              color={star <= userRating ? "#FFD700" : "#D3D3D3"}
              size={20}
              style={styles.star}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingCard: {
    backgroundColor: "#1f2937",
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e5e7eb",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  star: {
    marginRight: 5,
  },
});
