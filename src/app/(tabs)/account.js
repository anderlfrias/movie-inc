import ScreenLayout from "../../components/screen-layout";
import SignUp from "../../components/account/signup";
import AccountDetails from "../../components/account/details";
import { useAuth } from "../../context/auth-context";
import { Alert } from "react-native";

export default function Account() {
  const { loading, login, isAuthenticated, sessionId, logout, account } =
    useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = async () => {
    const resp = await login();
    console.log("Login response", resp);
    if (!resp.success) {
      Alert.alert(
        "Error",
        resp.message || "Error al iniciar sesión",
        [{ text: "OK" }],
        { cancelable: false },
      );
    }
  };

  console.log("Account screen", {
    loading,
    isAuthenticated,
    sessionId,
    account,
  });

  return (
    <ScreenLayout loading={loading}>
      {isAuthenticated && sessionId && (
        <AccountDetails
          account={account}
          sessionId={sessionId}
          onLogout={handleLogout}
        />
      )}
      {!isAuthenticated && <SignUp onLogin={handleLogin} />}
    </ScreenLayout>
  );
}
