
import { useEffect, useState } from "react";
import "./rating.scss"
import StarRating from "./starRating/starRating";


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
