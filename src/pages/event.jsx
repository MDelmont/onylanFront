import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"


const  EventPage = ()  => {
 
  IsAuth()


  return (
    <div className="event-Page">
        <h1>
          Evenement
        </h1>

    </div>
  );
}

export default EventPage;
