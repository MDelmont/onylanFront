import React, { useEffect, useState } from "react";
import "./timer.scss";
import useCustomTimer from "../../hook/useCustomTimer";
import Timer from "./timer";



/**
 * ContTimer est un composant React qui affiche un compteur de temps
 * qui compte le temps restant avant le 20 Juillet 2024.
 * Il utilise le hook useCustomTimer pour calculer le temps restant
 * et le composant Timer pour l'afficher.
 */
function ContTimer( ) {
    
  return <div className="timer">
    
        <Timer  />
    </div>
}

export default ContTimer;
