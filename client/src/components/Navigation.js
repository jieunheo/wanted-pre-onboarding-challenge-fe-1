import { Link } from "react-router-dom";


const Navigation = () => {
  return(
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/auth'>Auth</Link>
    </nav>
  );
}

export default Navigation;