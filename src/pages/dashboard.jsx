import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"

/**
 * @function DashbordPage
 * @description This component is the main page of the application.
 *              It displays a message with a link to the login page if the user is not connected.
 *              Otherwise, it displays a message with a link to the logout page.
 * @returns {ReactElement} The component.
 */
const  DashbordPage = ()  => {
  // generate jsDoc in english
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
