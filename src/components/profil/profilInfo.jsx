import React, { useEffect, useState } from "react";

import { getUserById } from "../../service/api/user/userApi";
import { introductionProfil } from "../../config/config";

import "./profilInfo.scss"

function Profil( {userId}) {
  
    console.log("Profil INFO",userId)
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        firstName: '',
        pseudo: '',
        file: null,
        budget:'',
      });

      useEffect( () => {
        console.log('UseEffect')
        getUserById(userId).then( response => {
            console.log(response.data.data)
            setFormData({...response.data.data})
        }

        ).catch( error => {
            console.log(error)
        })
      },[]
      )
      

  return <div className="personnal-Information">
        <img className='img-profil' src={formData.file} alt="profil image" />
        <div className="content-text">  
            <h2>{formData.pseudo}</h2>
            <p className="intro-random">{introductionProfil[Math.floor(Math.random() * introductionProfil.length)]}</p>
            <p>Il a entre {formData.budget.split('-')[0]} et  {formData.budget.split('-')[1] } euros de budget ce pleutre.</p>
        </div>
        </div>;
}

export default Profil;
