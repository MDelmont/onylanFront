import { useState, useEffect } from "react";

const useCustomTimer = (
  date=Date().setDate(currentDate.getDate() + 5)
) => {


  const [numberDays, setNumberDays] = useState();


  const [numberHours, setNumberHours] = useState();


  const [numberMinutes, setNumberMinutes] = useState();

  const [numberSecondes, setNumberSecondes] = useState();

  const formatTime = () => {

    let remainingTime = date - Date.now(); // Calcule le temps restant en millisecondes

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)); // Calcule les jours restants
    remainingTime = remainingTime % (1000 * 60 * 60 * 24); // Retire la durée des jours restants

    const hours = Math.floor(remainingTime / (1000 * 60 * 60)); // Calcule les heures restantes
    remainingTime = remainingTime % (1000 * 60 * 60); // Retire la durée des heures restantes

    const minutes = Math.floor(remainingTime / (1000 * 60)); // Calcule les minutes restantes
    remainingTime = remainingTime % (1000 * 60); // Retire la durée des minutes restantes

    const seconds = Math.floor(remainingTime / 1000); // Calcule les secondes restantes


    // Met à jour les valeurs d'état
    setNumberDays(days >0 ? days:0);
    setNumberHours(hours>0 ? hours:0);
    setNumberMinutes(minutes >0 ? minutes:0);
    setNumberSecondes(seconds>0 ? seconds:0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      formatTime();
    }, 1000);
  
    // Nettoie l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [date]);



  return [
    
    numberDays,


    numberHours,

  
   numberMinutes,

    
   numberSecondes,


  ];
};

export default useCustomTimer;
