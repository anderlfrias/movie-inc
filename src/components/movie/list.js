import { View, FlatList } from "react-native";
import React from "react";
import MovieCard from "./card";

export default function MovieList({ movies, horizontal, style }) {
  return (
    <View style={style}>
      <FlatList
        data={movies}
        renderItem={({ item, key }) => (
          <MovieCard key={key} movie={item} justPoster={horizontal} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
