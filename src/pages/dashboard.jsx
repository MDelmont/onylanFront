import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"
const  DashbordPage = ()  => {
  IsAuth()



  return (
    <div className="dashboard-Page">
        <h1>
          Tableau de bord
        </h1>
    </div>
  );
}

export default DashbordPage;
