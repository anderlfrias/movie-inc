import { Image, Pressable, View } from "react-native";
import { FavoriteIcon } from "../icons";
import { useFavorites } from "../../context/favorites-context";
import openAlert from "../../utils/open-alert";

export default function MoviePoster({ movie, style, containerStyles }) {
  const { isFavorite, removeFavorite, addFavorite } = useFavorites();

  const handleAddFavorite = async () => {
    const resp = await addFavorite(movie);
    if (!resp.success) {
      openAlert("Error", "No se pudo añadir a favoritos");
    }
  };

  const handleRemoveFavorite = async () => {
    const resp = await removeFavorite(movie.id);
    if (!resp.success) {
      openAlert("Error", "No se pudo eliminar de favoritos");
    }
  };

  return (
    <View style={[{ position: "relative" }, containerStyles]}>
      <Image source={{ uri: movie.poster.url }} style={style} />
      {isFavorite(movie.id) && (
        <Pressable
          onPress={handleRemoveFavorite}
          style={{
            zIndex: 1,
            padding: 5,
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <View
            style={{
              padding: 5,
              borderRadius: 50,
            }}
          >
            <FavoriteIcon name="heart" size={22} color="#FFD700" />
          </View>
        </Pressable>
      )}
      {!isFavorite(movie.id) && (
        <Pressable
          onPress={handleAddFavorite}
          style={{
            position: "absolute",
            padding: 5,
            top: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <View
            style={{
              padding: 5,
              borderRadius: 50,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <FavoriteIcon name="hearto" size={20} color="#fff" />
          </View>
        </Pressable>
      )}
    </View>
  );
}
