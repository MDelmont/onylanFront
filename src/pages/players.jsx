
import {  useEffect, useState } from "react";

import '../styles/playerPage.scss'
import {IsAuth} from "../components/auth/isAuth"
import { allGames } from "../service/api/user/userApi";
import UserCard from "../components/userCard/userCard";

/**
 * page for displaying the list of players
 * 
 * @returns {JSX.Element} Component for displaying the list of players
 */
const  PlayerPage = ()  => {
  IsAuth()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    allGames().then( resp => {


        setUsers(resp.data.data)
      
   
    }).catch(error =>{
      console.log(error)

    })
  },[])
  
  return (
  <div className="player-page">
    <h1>Liste des joueurs</h1>
    <div className="cont-players">
        {users && users.map(user => {
            return <UserCard key={user.pseudo} user={user} />
        })}
    </div>
    
  </div>
  );
}

export default PlayerPage;
