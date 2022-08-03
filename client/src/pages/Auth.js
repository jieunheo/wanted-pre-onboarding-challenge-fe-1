import AuthForm from "../components/auth/AuthForm";


const Auth = ({ setToken }) => {
  return (
    <div>
      <AuthForm setToken={setToken} />
    </div>
  );
}

export default Auth;