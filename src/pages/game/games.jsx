import { useEffect, useState } from "react";
import { IsAuth } from "../../components/auth/isAuth"
import BtnPrimary from '../../components/basic/btnPrimary/btnPrimary';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { allGames } from "../../service/api/game/gameApi";
import "../../styles/game/games.scss"
import GameCard from "../../components/gameCard/gameCard";
import { isAdminApi } from "../../service/api/user/userApi";

const BASE_URL = import.meta.env.VITE_FRONT_URL;

const GamesPage = () => {
    IsAuth();
    const [games, setGames] = useState(null)
    const navigate = useNavigate();
    const [isAdmin,setIsAdmin] =  useState()


    useEffect(() => {
        isAdminApi()
    .then(response => {
      setIsAdmin(response.data.data)
    })
    .catch(error => {
      console.log(error)
      setIsAdmin(false)
    }  
    )
        allGames()
            .then(response => {
                setGames(response.data.data)
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/game/create');
    };

  
    return (
        <div className="games-page">
            <h1>
                Les jeux 
            </h1>
            <BtnPrimary title={'Créer un jeu'} type={'submit'} onClick={handleSubmit} />
            <div className="games-cont">
            {games && games.map((game) => (
                <GameCard key={game.id} game={game}  maxNote={5} isAdmin={isAdmin} /> 
            ))}
            </div>
        </div>
    );
}

export default GamesPage;
