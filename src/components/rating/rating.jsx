
import { useEffect, useState } from "react";
import "./rating.scss"
import StarRating from "./starRating/starRating";


/**
 * @function Rating
 * @description component for rating
 * @param {number} actualNote - actual note of the game
 * @param {number} maxNote - max note for the game
 * @param {function} apiModifyNote - function to update note of the game
 * @param {string} id - id of the game
 * @returns {ReactElement} - react element of rating
 */
const Rating = ({actualNote,maxNote, apiModifyNote,id}) => {

    const [note, setNote] = useState('0')

    useEffect(() =>{
      setNote(actualNote)

    },[actualNote])
    
    const handleClick = (e) => {
        const {value} = e.target;
        setNote(value)

        apiModifyNote(id,value).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
    }
    const starList = Array.from({ length: maxNote }, (_, i) => `star${i + 1}`);

  return <div className="rating">
        {starList.map((htmlFor,index) => {

            return <StarRating key={index} htmlFor={htmlFor} id={`${id}${index}`} isActive={index+1 <= note ? true:false} onClick={handleClick} value={index+1}/>
            })}
  </div>
}

export default Rating;
