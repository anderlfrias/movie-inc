import { View } from "react-native";
import Button from "../ui/button";
import { FavoriteIcon } from "../icons";
import { useFavorites } from "../../context/favorites-context";
import openAlert from "../../utils/open-alert";

export default function AddMovieToFavorite({ movie, style }) {
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
    <View style={style}>
      {isFavorite(movie.id) ? (
        <Button
          onPress={handleRemoveFavorite}
          style={{ backgroundColor: "#1f2937" }}
          textStyle={{ color: "#fff" }}
          title="Añadida a favoritos"
          icon={<FavoriteIcon name="heart" color={"#fff"} />}
        />
      ) : (
        <Button
          onPress={handleAddFavorite}
          title="Añadir a favoritos"
          icon={<FavoriteIcon color={"#000"} />}
        />
      )}
    </View>
  );
}
