import React, { useEffect, useState } from "react";
import "./timer.scss";
import useCustomTimer from "../../hook/useCustomTimer";
import Timer from "./timer";



function ContTimer( ) {
  
    const [numberDays, numberHours, numberMinutes, numberSecondes] = useCustomTimer(new Date(2024, 6, 20))
    
  return <div className="timer">
    
        <Timer numberDays={numberDays} numberHours={numberHours} numberMinutes={numberMinutes} numberSecondes={numberSecondes} />
    </div>
}

export default ContTimer;
