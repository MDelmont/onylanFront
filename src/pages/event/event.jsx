import { useEffect, useState } from "react";
import { IsAuth } from "../../components/auth/isAuth"
import {  useNavigate, useParams } from "react-router-dom";
import { getGamesId } from "../../service/api/game/gameApi";
import "../../styles/game/game.scss"
import BtnPrimary from "../../components/basic/btnPrimary/btnPrimary";
import { getModesByGame } from "../../service/api/game/modeApi";

const EventPage = () => {
    IsAuth();

    const { idGame } = useParams();
    const [gameData, setGameData] = useState(null);
    const navigate =  useNavigate()
    useEffect( () => {
        getGamesId(idGame).then( response => {
            console.log(response)
            setGameData(response.data.data)
        }).catch(error => {

            console.log(error)
        })
    },[])
   
    const handleAddMode = (e) => {
        navigate(`/mode/create/${idGame}`);
    }
    const handleClickMode = (e) => {
        const modeId = e.currentTarget.getAttribute('data')
        if(e.button == 1) {
            window.open(`/mode/${modeId}`,'_blank')
          } else {
            navigate(`/mode/${modeId}`);
          }

    }
    gameData &&console.log(Object.keys(gameData),gameData.modes)
    return (
        <div className="game-Page">
         
            {!gameData  && <h1>Les données du jeux sont indisponible</h1>}
            {gameData && <>
                <h1>
                {gameData.name}
            </h1>
            <div className="cont-info">
                <div className="cont-image-game-page">
                    <img className="img-game" src={gameData.pictureUrl ? gameData.pictureUrl:'/logo_onylan.png'}></img>
                </div>
               
                <div className="cont-description">
                <div className="type-info">
                        <h2>Catégorie</h2>
                        <p>{gameData.categorie}</p>
                    </div>
                    <div className="info">
                        <h2>Description</h2>
                        <p>{gameData.description}</p>
                    </div>
                    <div className="info">
                        <h2>Téléchargement</h2>
                        <p>{gameData.downloadDescription}</p>
                    </div>
                    <div className="info">
                        <h2>Statistique</h2>
                        {gameData?.noteStat?._avg?.note && <p>Moyenne de la note : {gameData?.noteStat?._avg?.note}</p>}
                        {gameData?.noteStat?._count?.note && <p>Nombre de note : {gameData?.noteStat?._count?.note}</p>}
                    </div>
                    
                </div>
            </div>
            <div className="cont-mode">
                
            <h2>Mode de jeux</h2>
            <BtnPrimary title={'Ajouter un mode'} onClick={handleAddMode} />
            {gameData && gameData.modes.length >0 && <div className="cont-item-mode">
                { gameData && gameData.modes && gameData.modes.map(mode =>{
                    return <div className='mode-card' key={mode.id} data={mode.id} onMouseDown={handleClickMode} >
                                <p  >{mode.name}</p>
                            </div>
                })
                }
                </div>
                 }
            </div>
               
            </>
            }
        </div>
    );
}

export default EventPage;
