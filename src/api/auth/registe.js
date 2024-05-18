import axios from "axios";

exports.registerApi = (idToken,formData) => {

    axios.get(`http://localhost:5000/user/invit/${idToken}`,formData).then( resp => {

    return resp      
   
    }).catch(error =>{
        throw error
    })
}
