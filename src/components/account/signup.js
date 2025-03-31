import { Linking, Pressable, Text, View } from "react-native";
import Button from "../ui/button";
import { TMDB_URL } from "../../constants";
import { AddUserIcon } from "../icons";

export default function SignUp({ onLogin }) {
  return (
    <View style={styles.container}>
      <AddUserIcon size={64} color="#d1d5db" style={{ marginBottom: 20 }} />

      <Text style={styles.title}>Inicia sesión</Text>
      <Text style={styles.subtitle}>
        Accede a tu cuenta para gestionar tu lista de películas y más.
      </Text>

      <Button
        title="Iniciar sesión"
        onPress={onLogin}
        style={{ width: "100%", marginVertical: 10 }}
      />

      <Pressable onPress={() => Linking.openURL(`${TMDB_URL}/signup`)}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? Regístrate en TMDB
        </Text>
      </Pressable>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#9ca3af",
    textDecorationLine: "underline",
  },
};
