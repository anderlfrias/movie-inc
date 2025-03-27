import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useMovies } from './hooks/useMovies';

export default function App() {
  const { movies, loading, error } = useMovies();

  const renderMovie = ({ item: movie }) => (
    <Pressable
      style={styles.movieItem}
      onPress={() => console.log(`Selected movie: ${movie}`)}
    >
      <Image source={{ uri: movie.poster.url }} style={styles.poster} />
      <View style={styles.movieInfo}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>Estreno: {movie.releaseDate}</Text>
        <Text>Calificación: {movie.vote.average}/10</Text>
      </View>
    </Pressable>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff'}}>{error}</Text>
      </View>
    );
  }
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      renderItem={renderMovie}
      keyExtractor={(movie) => movie.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  movieInfo: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
