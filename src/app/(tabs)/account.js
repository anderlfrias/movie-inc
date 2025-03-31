import ScreenLayout from "../../components/screen-layout";
import useAuth from "../../hooks/useAuth";
import SignUp from "../../components/account/signup";
import { Text, View } from "react-native";
import Button from "../../components/ui/button";
import ErrorMessage from "../../components/error-message";

export default function Account() {
  const { loading, login, logout, isAuthenticated, error } = useAuth();
  console.log(error);

  return (
    <ScreenLayout loading={loading}>
      {error && (
        <ErrorMessage
          key={error}
          message={error}
          duration={3000}
          style={{ marginBottom: 20 }}
        />
      )}

      {isAuthenticated && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#FFF" }}>
            Ya tienes una sesión iniciada. Puedes cerrar sesión o continuar.
          </Text>

          <Button
            title="Cerrar sesión"
            onPress={logout}
            style={{ marginTop: 20 }}
          />
        </View>
      )}
      {!isAuthenticated && <SignUp onLogin={login} />}
    </ScreenLayout>
  );
}
