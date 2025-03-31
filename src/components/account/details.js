import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { apiGetAccountBySessionId } from "../../api/auth";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { POSTER_URL } from "../../constants";
import ErrorMessage from "../error-message";

export default function AccountDetails({ sessionId, onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      const resp = await apiGetAccountBySessionId(sessionId);
      setLoading(false);
      if (resp.success) {
        setUser(resp.data);
        setError(null);
      } else {
        setError(resp.message);
      }
    };

    fetchUserInfo();
  }, [sessionId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        key={error}
        message={error}
        duration={3000}
        style={{ marginBottom: 20 }}
      />
    );
  }

  return (
    <View>
      {user && (
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            {user.avatar.tmdb.avatar_path === null ? (
              <View style={styles.avatar}>
                <Image
                  source={require("../../assets/default-actor-image.png")}
                  style={{ width: 64, height: 64 }}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <Image
                source={{
                  uri: `${POSTER_URL}${user.avatar.tmdb.avatar_path}`,
                }}
                style={styles.avatar}
              />
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name || ""}</Text>
            <Text style={styles.username}>@{user.username}</Text>
          </View>

          <Pressable
            onPress={onLogout}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && {
                opacity: 0.5,
              },
            ]}
          >
            <Ionicons name="log-out-outline" size={24} color="#ff5c5c" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#222", // Gris oscuro para el contenedor
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevación para Android
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 8,
    marginRight: 15,
    backgroundColor: "#333", // Gris oscuro para el placeholder del avatar
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff", // Texto blanco para contraste
  },
  username: {
    fontSize: 16,
    color: "#bbb", // Gris claro para el username
    marginTop: 2,
  },
  logoutButton: {
    marginLeft: "auto",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 92, 92, 0.2)", // Fondo rojo sutil para el botón
  },
});
