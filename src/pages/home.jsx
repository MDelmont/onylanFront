import Timer from "../components/timer/timer";
import useCustomTimer from "../hook/useCustomTimer";
import '../styles/homepage.scss'


const  HomePage = ()  => {
  const [numberDays, numberHours, numberMinutes,numberSecondes] = useCustomTimer(new Date(2024, 5, 16))
  
  console.log(numberDays, numberHours, numberMinutes,numberSecondes)

  return (
    <div className="home-Page">
        <h1 className="cont-title">
        <span className="title">Onylan</span><span className="date">2024</span>
        </h1>
        <iframe className="teaser" src="https://www.youtube.com/embed/9TGlc0Fufgk" frameborder="0" allowFullScreen />

        <div className="info-cont">
            <p>
              Bienvenu à la Onylan 2024, Suite au franc succes de la OnyLan 2023. 
              Cette nouvelle edition à pour but de réitérer l'experience !
              Cette evenement peu se rejoindre que par invitation. Si vous etes l'un des chanceux 
              Dans cette edition, quelque achat de jeux seront necessaire. 
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
