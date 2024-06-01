import { useEffect, useState } from "react";
import { IsAuth } from "../components/auth/isAuth"
import BtnPrimary from '../components/basic/btnPrimary/btnPrimary';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { allGames } from "../service/api/game/gameApi";

const BASE_URL = import.meta.env.VITE_FRONT_URL;

const GamesPage = () => {
    IsAuth();
    const [games, setGames] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleLoadGame = (e) => {
        const idGame = e.currentTarget.id
        navigate(`/game/${idGame}`, { state: { idGame } });
    }
    return (
        <div className="game-Page">
            <h1>
                Jeux
            </h1>
            <BtnPrimary title={'Créer un jeu'} type={'submit'} onClick={handleSubmit} />

            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {games && games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.name}</td>
                            <td>
                                <button onClick={handleLoadGame} id={game.id}>Accèder au jeu</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GamesPage;
