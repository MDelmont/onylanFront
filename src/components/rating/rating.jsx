
import { useState } from "react";
import "./rating.scss"
import StarRating from "./starRating/starRating";


const Rating = ({nbNote}) => {

    const [note, setNote] = useState('0')
    const handleClick = (e) => {
        const {value} = e.target;
        console.log(e.target)
        setNote(value)
    }
    const starList = Array.from({ length: nbNote }, (_, i) => `star${i + 1}`);

    console.log('note',note)
  return <div className="rating">
        {starList.map((htmlFor,index) => {
            console.log(index)
            console.log(note)
            console.log(index+1)
            console.log(index+1 < note)
            return <StarRating key={index} htmlFor={htmlFor} isActive={index+1 <= note ? true:false} onClick={handleClick} value={index+1}/>
            })}
  </div>
}

export default Rating;
