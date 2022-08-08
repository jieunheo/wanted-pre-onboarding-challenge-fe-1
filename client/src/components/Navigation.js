import { NavLink, useNavigate } from "react-router-dom";

import './Navigation.css';

const Navigation = ({ login, setToken }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate('/');
  }

  return(
    <nav>
      <NavLink to='/'>Home</NavLink>
      {!login && <NavLink to='/auth'>Auth</NavLink>}
      {login && <NavLink to='/todos'>To Do</NavLink>}
      {login && <button className="logout-btn" type="button" onClick={logoutHandler}>logout</button>}
    </nav>
  );
}

export default Navigation;