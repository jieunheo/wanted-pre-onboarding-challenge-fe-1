import AuthForm from "../components/auth/AuthForm";


const Auth = ({ setToken }) => {
  return (
    <AuthForm setToken={setToken} />
  );
}

export default Auth;