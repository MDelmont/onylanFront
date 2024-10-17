import React, { useEffect, useState } from "react";
import "./timer.scss";
import NumberTimer from "./numberTimer/numberTimer";
import useCustomTimer from "../../hook/useCustomTimer";



/**
 * Timer est un composant React qui affiche un compteur de temps
 * qui compte le temps restant avant le 20 Juillet 2024.
 * Il utilise le hook useCustomTimer pour calculer le temps restant
 * et le composant NumberTimer pour l'afficher.
 */
function Timer( ) {
  
    const [numberDays, numberHours, numberMinutes, numberSecondes] = useCustomTimer(new Date(2024, 11, 20))
    function digitsToArray(number) {
        
        if(number || number ==0){
            
        const numberString = number.toString();
        const digitsArray = numberString.split('');
        if (digitsArray.length <2){
            digitsArray.unshift('0');
        }
        return digitsArray;

        } else  {
            return []
        }
      }

    const [timedata,setTimedata] = useState( {
        days: {title:'Jours',value:digitsToArray(numberDays)},
        hours: {title:'Heures',value:digitsToArray(numberHours)},
        minutes: {title:'Minutes',value:digitsToArray(numberMinutes)},
        secondes: {title:'Secondes',value:digitsToArray(numberSecondes)}

    }) 
    
    useEffect (() =>{

        setTimedata({
            days: {title:'Jours',value:digitsToArray(numberDays)},
            hours: {title:'Heures',value:digitsToArray(numberHours)},
            minutes: {title:'Minutes',value:digitsToArray(numberMinutes)},
            secondes: {title:'Secondes',value:digitsToArray(numberSecondes)}
    
        })

    },[numberDays, numberHours, numberMinutes, numberSecondes])




  return (
   <div className="time-cont">
     
    {timedata && Object.entries(timedata).map(([key, { title, value }]) => {
        return <div key={key} className="timer-part"><div className="timer-numbers">
            
            {value && (title == 'Secondes' || title =='Minutes') && value.map((number, index)=> {  return <NumberTimer key={index} maxValue={index==0?5:9} numberActive={number} />} )}
            {value && (title == 'Heures') && value.map((number, index)=> <NumberTimer key={index} maxValue={index==0?2:value[index-1]==2?4:9} numberActive={number} /> )}  
            {value && (title == 'Jours') && value.map((number, index)=> <NumberTimer key={index} maxValue={9} numberActive={number} /> )}  
            </div>
            <p>{title}</p>
            
            </div>})}
    
    </div>
  );
}

export default Timer;
