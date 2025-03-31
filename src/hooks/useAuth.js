import { apiCreateRequestToken, apiCreateSession } from "../api/auth";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { TMDB_URL } from "../constants";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRequestToken = async () => {
    const response = await apiCreateRequestToken();

    if (response.success) {
      return response.data.request_token;
    } else {
      throw new Error("Error al crear el request token");
    }
  };

  const createSession = async (requestToken) => {
    const response = await apiCreateSession(requestToken);

    if (response.success) {
      await saveSession(response.data);
    }

    return response;
  };

  const saveSession = async (session) => {
    await SecureStore.setItemAsync("session", JSON.stringify(session));
  };

  const getSession = async () => {
    const session = await SecureStore.getItemAsync("session");
    if (session) {
      const parsedSession = JSON.parse(session);
      return parsedSession.session_id;
    }
    return null;
  };

  const authenticateUser = async () => {
    try {
      const requestToken = await getRequestToken();
      const rediretUrl = Linking.createURL("account");

      const authUrl = `${TMDB_URL}/authenticate/${requestToken}?redirect_to=${encodeURIComponent(rediretUrl)}`;

      const result = await WebBrowser.openAuthSessionAsync(authUrl, rediretUrl);
      if (result.type === "success") {
        return await createSession(requestToken);
      } else {
        return {
          success: false,
          message: "Error al autenticar al usuario",
          error: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error al autenticar al usuario",
        error,
      };
    }
  };

  const login = async () => {
    setLoading(true);
    const resp = await authenticateUser();
    if (resp.success) {
      setIsAuthenticated(true);
      setSessionId(resp.data.session_id);
      setError(null);
    } else {
      console.error("Error al iniciar sesión:", resp.message);
      setError(resp.message);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync("session");
    setLoading(false);
    setIsAuthenticated(false);
    setSessionId(null);
  };

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const session = await getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  useEffect(() => {
    const getSessionId = async () => {
      const session = await getSession();
      if (session) {
        setSessionId(session);
      }
    };
    getSessionId();
  }, []);

  return {
    authenticateUser,
    isAuthenticated,
    getSession,
    sessionId,
    loading,
    logout,
    login,
    error,
  };
}
