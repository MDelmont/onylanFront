import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"


/**
 * This component is the page for the team
 * @returns {JSX.Element} return a JSX element
 * @example
 * <EquipePage />
 */
const  EquipePage = ()  => {

  IsAuth();

  return (
    <div className="equipe-Page">
        <h1>
          Equipe
        </h1>
    </div>
  );
}

export default EquipePage;
