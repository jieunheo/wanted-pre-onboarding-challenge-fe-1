import { Link, useNavigate } from "react-router-dom";


const Navigation = ({ login }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  return(
    <nav>
      <Link to='/'>Home</Link>
      {!login && <Link to='/auth'>Auth</Link>}
      {login && <Link to='/todos'>To Do</Link>}
      {login && <button type="button" onClick={logoutHandler}>logout</button>}
    </nav>
  );
}

export default Navigation;