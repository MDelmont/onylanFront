
import "./gameCard.scss"


import Rating from '../rating/rating';
import { useNavigate } from "react-router-dom";
import { updateGameNote } from "../../service/api/game/gameApi";
import { useState } from "react";
import BtnPrimary from "../basic/btnPrimary/btnPrimary";
import BtnSecondary from "../basic/btnSecondary/btnSecondary";

const GameCard = ({game,maxNote,isAdmin}) => {
  
  const navigate = useNavigate()
  
  const handleClick = (e) =>{
    const {className} = e.target
    const classNameRedirect = ['game-card','cont-img','title-cont']
    if (classNameRedirect.includes(className)){

        navigate(`/game/${game.id}`);
    }
  }

  const handleModifyGame =  (idGame) => {
    console.log(idGame)
    navigate(`/game/update/${game.id}`)
  }
  return <div className="game-card" onClick={handleClick}>
    
    <div className="cont-img">

      <img className="img-card" src={game.pictureUrl ? game.pictureUrl:'/logo_onylan.png'}></img>

    </div>
    {!isAdmin  && <div className="cont-rating"><Rating actualNote={game.userGames[0] ? game.userGames[0].note:null} maxNote={maxNote} id={game.id} apiModifyNote={updateGameNote}/></div>}
    {isAdmin  && <div className="cont-modify"><BtnSecondary title={'Modifier'} onClick={(e) => {handleModifyGame(game.id)}} /></div>}
   
    <div className="title-cont">

    <p className="title">{game.name}</p>
    </div>
      
  </div>
}

export default GameCard;
