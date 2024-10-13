import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"



/**
 * @function EventPage
 * @description This component is the page of an event.
 *              It displays a message with the event name.
 * @returns {ReactElement} The component.
 */
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
