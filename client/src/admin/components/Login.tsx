import LoginPanel from "./shared/LoginPanel";
import { useAdminLogin } from "../hooks/useAdminLogin";

const Login = () => {
  const login = useAdminLogin();
  return (
    <LoginPanel
      credentials={login.credentials}
      loading={login.loading}
      error={login.error}
      onChange={login.change}
      onSubmit={login.submit}
      onHome={login.goHome}
    />
  );
};

export default Login;
