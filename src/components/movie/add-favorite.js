import { View } from "react-native";
import Button from "../ui/button";
import { FavoriteIcon } from "../icons";
import { useEffect, useState } from "react";
import { apiGetMovieAccountStates } from "../../api/movie";
import { apiAddMovieToFavorites } from "../../api/account";
import { useAuth } from "../../context/auth-context";

export default function AddMovieToFavorite({ movieId, style }) {
  const {
    sessionId,
    account: { id: accountId },
  } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const onAddFavorite = async () => {
    console.log("Añadir a favoritos", movieId);
    const resp = await apiAddMovieToFavorites(accountId, sessionId, movieId);
    console.log("resp", resp);
    if (resp.success) {
      setIsFavorite(true);
    } else {
      console.log("Error al añadir a favoritos", resp.error);
    }
  };

  const onRemoveFavorite = async () => {
    console.log("Eliminar de favoritos", movieId);
    const resp = await apiAddMovieToFavorites(accountId, sessionId, movieId);
    if (resp.success) {
      setIsFavorite(false);
    } else {
      console.log("Error al eliminar de favoritos", resp.error);
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      console.log("Comprobando si la película está en favoritos", movieId);
      const resp = await apiGetMovieAccountStates(movieId, sessionId);
      if (resp.success) {
        setIsFavorite(resp.data.favorite);
      } else {
        console.log("Error al obtener el estado de la película", resp.error);
      }
    };
    checkIfFavorite();
  }, [movieId, sessionId]);

  return (
    <View style={style}>
      {isFavorite ? (
        <Button
          onPress={onRemoveFavorite}
          style={{ backgroundColor: "#1f2937" }}
          textStyle={{ color: "#fff" }}
          title="Añadida a favoritos"
          icon={<FavoriteIcon name="heart" color={"#fff"} />}
        />
      ) : (
        <Button
          onPress={onAddFavorite}
          title="Añadir a favoritos"
          icon={<FavoriteIcon color={"#000"} />}
        />
      )}
    </View>
  );
}
