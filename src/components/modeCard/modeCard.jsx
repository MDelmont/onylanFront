
import "./modeCard.scss"

import { useNavigate } from "react-router-dom";


/**
 * @function ModeCard
 * @description component for mode card
 * @param {Object} mode - mode object to display
 * @returns {ReactElement} - react element of mode card
 */

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
