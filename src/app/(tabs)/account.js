import ScreenLayout from "../../components/screen-layout";
import useAuth from "../../hooks/useAuth";
import SignUp from "../../components/account/signup";
import ErrorMessage from "../../components/error-message";
import AccountDetails from "../../components/account/details";

export default function Account() {
  const { loading, login, isAuthenticated, error, sessionId, logout } =
    useAuth();

  const handleLogout = () => {
    logout();
  };

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

      {isAuthenticated && sessionId && (
        <AccountDetails sessionId={sessionId} onLogout={handleLogout} />
      )}
      {!isAuthenticated && <SignUp onLogin={login} />}
    </ScreenLayout>
  );
}
