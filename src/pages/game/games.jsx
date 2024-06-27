import { useEffect, useState } from "react";
import { IsAuth } from "../../components/auth/isAuth"
import BtnPrimary from '../../components/basic/btnPrimary/btnPrimary';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { allGames } from "../../service/api/game/gameApi";
import "../../styles/game/games.scss"
import GameCard from "../../components/gameCard/gameCard";
import { isAdminApi } from "../../service/api/user/userApi";
import InputLabel from "../../components/formulaire/inputLabel/inputLabel";
import InputPrimary from "../../components/basic/inputPrimary/inputPrimary";
import InputPrimaryDropdown from "../../components/basic/inputPrimaryDropdown/inputPrimaryDropdown";
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
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/game/create');
    };

  const handleChangeSort = (e) => {
    let gamesToSort = [...games]
    const {value} = e.target
    if ("Date d'ajout" == value) {
        gamesToSort.sort((a, b) => a.id - b.id);
    } else if ("Note" == value) {
        gamesToSort.sort((a, b) => b.noteStat._avg.note - a.noteStat._avg.note);
    } else if ("Nombre de vote" == value) {
        gamesToSort.sort((a, b) => b.noteStat._count.note -  a.noteStat._count.note);
    } else if ("Nom" == value) {
        gamesToSort.sort((a, b) => a.name.localeCompare(b.name));
    } else if ("Catégorie" == value) {
        gamesToSort.sort((a, b) => a.categorie.localeCompare(b.categorie));
    }
    setGames(gamesToSort)
  }
    return (
        <div className="games-page">
            <h1>
                Les jeux 
            </h1>
            <BtnPrimary title={'Créer un jeu'} type={'submit'} onClick={handleSubmit} />
            <div className="filter-games">
            <InputLabel htmlFor="sortBy" title="Trier par" input={
                        <InputPrimaryDropdown onChange={handleChangeSort} options={["Date d'ajout",'Note','Nom','Nombre de vote','Catégorie']}  />
                        
                
                    } />
                    </div>
            <div className="games-cont">
            {games && games.map((game) => (
                <GameCard key={game.id} game={game}  maxNote={5} isAdmin={isAdmin} /> 
            ))}
            </div>
        </div>
    );
}

export default GamesPage;
