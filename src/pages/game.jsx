import { useEffect } from "react";
import {IsAuth} from "../components/auth/isAuth"


const  GamePage = ()  => {
  IsAuth()

  return (
    <div className="game-Page">
        <h1>
          Jeux
        </h1>

    </div>
  );
}

export default GamePage;
