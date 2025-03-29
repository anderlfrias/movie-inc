import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCreateGuestSession, apiCreateRequestToken } from "../api/auth";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export default function useAuth() {
  const getGuestSession = async () => {
    // Busco si ya tengo un guest session en el localStorage
    const guestSession = await AsyncStorage.getItem("guestSession");

    if (guestSession) {
      // Si ya tengo un guest session, lo devuelvo
      // Reviso que no haya expirado
      const guestSessionData = JSON.parse(guestSession);
      const expirationDate = new Date(guestSessionData.expires_at);
      const currentDate = new Date();
      if (expirationDate > currentDate) {
        return guestSessionData;
      }
      // Si ha expirado, lo borro
      await AsyncStorage.removeItem("guestSession");
    }
    // Si no tengo un guest session, lo creo
    const response = await apiCreateGuestSession();

    if (response.success) {
      // Almaceno el guest session en el localStorage
      await AsyncStorage.setItem("guestSession", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error("Error al crear la sesión de invitado");
    }
  };

  const getRequestToken = async () => {
    const response = await apiCreateRequestToken();

    if (response.success) {
      return response.data.request_token;
    } else {
      throw new Error("Error al crear el request token");
    }
  };

  const createSession = async (requestToken) => {
    const response = await apiCreateGuestSession(requestToken);

    if (response.success) {
      await AsyncStorage.setItem("session", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error("Error al crear la sesión");
    }
  };

  const authenticateUser = async () => {
    try {
      const requestToken = await getRequestToken();
      const rediretUrl = Linking.createURL("redirect");

      const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${rediretUrl}`;

      const result = await WebBrowser.openAuthSessionAsync(authUrl, rediretUrl);
      if (result.type === "success") {
        createSession(requestToken);
      } else {
        console.error("Error al autenticar al usuario");
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  };

  const getSession = async () => {
    const session = await AsyncStorage.getItem("session");
    console.log("Session", JSON.parse(session));
    return JSON.parse(session);
  };

  return {
    // sesionId: async () => await getSession(),
    authenticateUser,
    getGuestSession,
    getSession,
  };
}
