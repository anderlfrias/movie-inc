import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StarIcon } from "../icons";

const Rating = ({ average, count, showVotes }) => {
  return (
    <View style={styles.container}>
      <StarIcon name="star" color={"#FFD700"} size={16} style={styles.star} />
      <Text style={styles.rating}>
        {average}
        <Text style={styles.outOfTen}>/10</Text>
        {showVotes && <Text style={styles.votes}> ({count} votos)</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  outOfTen: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 12,
  },
  votes: {
    color: "#9ca3af",
    fontWeight: "400",
    fontSize: 12,
  },
  star: {
    marginRight: 5,
  },
});

export default Rating;
