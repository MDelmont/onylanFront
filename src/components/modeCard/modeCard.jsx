
import "./modeCard.scss"

import { useNavigate } from "react-router-dom";

const ModeCard = ({mode}) => {

  const navigate = useNavigate()
  const handleClick = (e) =>{

        // navigate(`/mode/${game.id}`);

    
  }
  return <div className="mode-card" onClick={handleClick}>
   <p className="title">{mode.name}</p>
      
  </div>
}

export default ModeCard;
