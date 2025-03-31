import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { TMDB_URL } from "../constants";
import { apiCreateRequestToken, apiCreateSession } from "../api/auth";
import { apiGetAccountBySessionId } from "../api/account";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRequestToken = async () => {
    const response = await apiCreateRequestToken();
    if (response.success) {
      return { success: true, data: response.data.request_token, message: "" };
    }

    return {
      success: false,
      data: null,
      message: "Error al obtener el token de solicitud",
    };
  };

  const createSession = async (requestToken) => {
    const response = await apiCreateSession(requestToken);
    if (response.success) {
      return { success: true, data: response.data, message: "" };
    }

    return { success: false, data: null, message: "Error al crear la sesión" };
  };

  const getAccountBySessionId = async (sessionId) => {
    const response = await apiGetAccountBySessionId(sessionId);
    if (response.success) {
      return { success: true, data: response.data, message: "" };
    }

    return {
      success: false,
      data: null,
      message: "Error al obtener la cuenta",
    };
  };

  const saveAccount = async (account) => {
    setAccount(account);
    await SecureStore.setItemAsync("account", JSON.stringify(account));
  };

  const saveSession = async (session) => {
    setSessionId(session.session_id);
    await SecureStore.setItemAsync("session", JSON.stringify(session));
  };

  const getStoredSession = async () => {
    const sessionStr = await SecureStore.getItemAsync("session");
    if (sessionStr) {
      const sessionObj = JSON.parse(sessionStr);
      return sessionObj.session_id;
    }
    return null;
  };

  const getStoredAccount = async () => {
    const accountStr = await SecureStore.getItemAsync("account");
    if (accountStr) {
      const accountObj = JSON.parse(accountStr);
      return accountObj;
    }
    return null;
  };

  const login = async () => {
    setLoading(true);
    try {
      const tokenResult = await getRequestToken();
      if (!tokenResult.success) {
        return tokenResult;
      }

      const requestToken = tokenResult.data;
      const redirectUrl = Linking.createURL("account");
      const authUrl = `${TMDB_URL}/authenticate/${requestToken}?redirect_to=${encodeURIComponent(redirectUrl)}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl,
      );

      if (result.type !== "success") {
        return {
          success: false,
          message: "Error de autenticación",
        };
      }

      const sessionResult = await createSession(requestToken);
      if (!sessionResult.success) return sessionResult;

      const accountResult = await getAccountBySessionId(
        sessionResult.data.session_id,
      );
      if (!accountResult.success) return accountResult;

      await saveSession(sessionResult.data);
      await saveAccount(accountResult.data);

      setIsAuthenticated(true);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error en el flujo de autenticación",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await SecureStore.deleteItemAsync("session");
      await SecureStore.deleteItemAsync("account");
      setSessionId(null);
      setAccount(null);
      setIsAuthenticated(false);
      return { success: true, message: "Sesión cerrada" };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Error cerrando sesión",
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const storedSession = await getStoredSession();
        if (storedSession) {
          setSessionId(storedSession);
          setIsAuthenticated(true);
          const storedAccount = await getStoredAccount();
          if (storedAccount) {
            setAccount(storedAccount);
          }
        }
      } catch (error) {
        console.error("Error inicializando la sesión", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        sessionId,
        account,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
