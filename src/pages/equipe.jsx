import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"
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
