import ScreenLayout from "../../components/screen-layout";
import SignUp from "../../components/account/signup";
import AccountDetails from "../../components/account/details";
import { useAuth } from "../../context/auth-context";
import { Alert } from "react-native";
import AccountFavorites from "../../components/movie/favorites";

export default function Account() {
  const { loading, login, isAuthenticated, sessionId, logout, account } =
    useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = async () => {
    const resp = await login();
    if (!resp.success) {
      Alert.alert(
        "Error",
        resp.message || "Error al iniciar sesión",
        [{ text: "OK" }],
        { cancelable: false },
      );
    }
  };

  return (
    <ScreenLayout loading={loading}>
      {isAuthenticated && sessionId && (
        <>
          <AccountDetails
            style={{ marginBottom: 36 }}
            account={account}
            sessionId={sessionId}
            onLogout={handleLogout}
          />

          <AccountFavorites style={{ marginBotton: 24 }} horizontal />
        </>
      )}
      {!isAuthenticated && <SignUp onLogin={handleLogin} />}
    </ScreenLayout>
  );
}
