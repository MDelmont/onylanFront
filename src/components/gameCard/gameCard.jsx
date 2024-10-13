
import "./gameCard.scss"


import Rating from '../rating/rating';
import { useNavigate } from "react-router-dom";
import { updateGameNote } from "../../service/api/game/gameApi";
import BtnSecondary from "../basic/btnSecondary/btnSecondary";

/**
 * @function GameCard
 * @description component for game card
 * @param {Object} game - game object to display
 * @param {number} maxNote - max note for rating
 * @param {boolean} isAdmin - boolean to know if user is admin
 * @returns {ReactElement} - react element of game card
 */
const GameCard = ({game,maxNote,isAdmin}) => {

  const navigate = useNavigate()
  
  const handleClick = (e) =>{
    const {className} = e.target
    const classNameRedirect = ['game-card','cont-img','title-cont']
    console.log(e.button)
    
    if (classNameRedirect.includes(className)){
      if(e.button == 1) {
        window.open(`/game/${game.id}`,'_blank')
      } else {
        navigate(`/game/${game.id}`);
      }
        
    }
  }

  const handleModifyGame =  (idGame) => {
    console.log(idGame)
    navigate(`/game/update/${game.id}`)
  }
  return <div className="game-card" onMouseDown={handleClick}>
    
    <div className="cont-img">

      <img className="img-card" src={game.pictureUrl ? game.pictureUrl:'/logo_onylan.png'}></img>

    </div>
    { game?.noteStat?._avg?.note && <div className="stats-avg">Moyenne : {parseFloat(game.noteStat._avg.note).toFixed(2)}</div>}
    { game?.noteStat?._count?.note && <div className="stats-count">Nombre : {parseInt(game.noteStat._count.note)}</div>}
    {!isAdmin  && <div className="cont-rating"><Rating actualNote={game.userGames[0] ? game.userGames[0].note:null} maxNote={maxNote} id={game.id} apiModifyNote={updateGameNote}/></div>}
    {isAdmin  && <div className="cont-modify"><BtnSecondary title={'Modifier'} onClick={(e) => {handleModifyGame(game.id)}} /></div>}
   
    <div className="title-cont">

    <p className="title">{game.name}</p>
    </div>
      
  </div>
}

export default GameCard;
