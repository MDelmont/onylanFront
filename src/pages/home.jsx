import Timer from "../components/timer/timer";
import useCustomTimer from "../hook/useCustomTimer";
import '../styles/homepage.scss'


const  HomePage = ()  => {
  const [numberDays, numberHours, numberMinutes,numberSecondes] = useCustomTimer(new Date(2024, 5, 16))
  

  return (
    <div className="home-Page">
        <h1 className="cont-title">
        <span className="title">Onylan</span><span className="date">2024</span>
        </h1>
        <iframe className="teaser" src="https://www.youtube.com/embed/9TGlc0Fufgk" frameborder="0" allowFullScreen />

        <div className="info-cont">
            <p>
            Bienvenue sur le site officiel de la Onylan.
          En vue des événements, prochains et passés, nous avons mis au point ce site pour nous organiser au mieux lors de la préparation des Onylans et ainsi pallier les problèmes rencontrés lors du premier événement.
          Ce site est en construction, donc pour l'instant vous n'aurez pas accès à toutes les fonctionnalités. Cependant, ceux ayant reçu une invitation peuvent d'ores et déjà s'inscrire pour participer à la Onylan Erebus (Onylan 2024).
            </p>
            <div className="orange-barre"></div>
        </div>
       
        <div className="cont-timer">
            <div className="timer">
            
              <Timer numberDays={numberDays} numberHours={numberHours} numberMinutes={numberMinutes} numberSecondes={numberSecondes} />
            </div>
        </div>
    </div>
  );
}

export default HomePage;
