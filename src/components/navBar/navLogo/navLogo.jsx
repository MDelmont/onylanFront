
import { useNavigate } from 'react-router-dom';
import './navLogo.scss'
const NavLogo = () => {
  const navigate = useNavigate()
  const handleNavLogo  = (e) => {

      navigate(`/home`)

  }

  return (
    <div className="nav-logo" onClick={handleNavLogo}>

  </div>
  );
};

export default NavLogo;
