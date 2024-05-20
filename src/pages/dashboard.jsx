import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"
const  DashbordPage = ()  => {
  IsAuth()



  return (
    <div className="dashboard-Page">
        <h1>
          Dashboard
        </h1>
    </div>
  );
}

export default DashbordPage;
