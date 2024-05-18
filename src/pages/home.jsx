import Timer from "../components/timer";
import useCustomTimer from "../hook/useCustomTimer";
import '../styles/homepage.scss'


const  HomePage = ()  => {
  const [numberDays, numberHours, numberMinutes,numberSecondes] = useCustomTimer(new Date(2024, 4, 16))
  
  console.log(numberDays, numberHours, numberMinutes,numberSecondes)

  return (
    <div className="home-Page">
        <h1 className="title">
          Onylan 2024
        </h1>
        <iframe className="teaser" src="https://www.youtube.com/embed/j9hjcAsz2dQ" frameborder="0" allowFullScreen />

        <div className="info-cont">
          <div className="text-home">
            <h2>Tout savoir</h2>
            <p>
              Bienvenu à la Onylan 2024, Suite au franc succes de la OnyLan 2023. 
              Cette nouvelle edition à pour but de réitérer l'experience !
            </p>
            <p>
              Cette evenement peu se rejoindre que par invitation. Si vous etes l'un des chanceux 
            </p>
            <p>
              Dans cette edition, quelque achat de jeux seront necessaire. 
            </p>
        
          </div>

          <div className="cont-timer">
            <h2>Temps avant la fin des inscriptions</h2>
              <div className="timer">
                <br />
                <Timer numberDays={numberDays} numberHours={numberHours} numberMinutes={numberMinutes} numberSecondes={numberSecondes} />
              </div>
          </div>
        </div>
        <button className="btn-submit">Inscription</button>
    </div>
  );
}

export default HomePage;
