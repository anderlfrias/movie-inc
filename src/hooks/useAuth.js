import AsyncStorage from "@react-native-async-storage/async-storage";
import { createGuestSession } from "../api/auth";

export default function useAuth() {
  const getGuestSession = async () => {
    // Busco si ya tengo un guest session en el localStorage
    const guestSession = await AsyncStorage.getItem("guestSession");

    if (guestSession) {
      return JSON.parse(guestSession);
    }
    // Si no tengo un guest session, lo creo
    const response = await createGuestSession();

    if (response.success) {
      // Almaceno el guest session en el localStorage
      await AsyncStorage.setItem("guestSession", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error("Error al crear la sesión de invitado");
    }
  };

  return {
    guestSession: getGuestSession(),
  };
}
