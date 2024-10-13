
import { useNavigate } from 'react-router-dom';
import './navLogo.scss'

/**
 * NavLogo component
 * @returns {JSX} a div with a logo of the OnyLAN association
 * that navigate to the home page when clicked
 */
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
 