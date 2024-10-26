import '../../styles/mode/modePage.scss'
import { useEffect, useState } from "react";
import { IsAuth } from "../../components/auth/isAuth"
import InputLabel from '../../components/formulaire/inputLabel/inputLabel';
import BtnSecondary from '../../components/basic/btnSecondary/btnSecondary';
import BtnPrimary from '../../components/basic/btnPrimary/btnPrimary';
import InputPrimary from '../../components/basic/inputPrimary/inputPrimary';
import { useNavigate, useParams } from "react-router-dom";
import { messageErrorsReturnApi } from "../../config/config";
import { createGame } from "../../service/api/game/gameApi";
import { deleteMode, getModesById } from "../../service/api/game/modeApi";
import { isAdminApi } from "../../service/api/user/userApi";


/**
 * Page of a mode, display the mode information and the game of the mode
 * @returns {JSX.Element}
 */
const ModePage = () => {
    IsAuth();
    const navigate = useNavigate();
    const [modeData, setModeData] = useState(null);
    const { idMode } = useParams();
    const [isAdmin,setIsAdmin] =  useState()

    useEffect( () => {

        getModesById(idMode).then(response => {
            setModeData(response.data.data)
            isAdminApi()
                .then(response => {
                setIsAdmin(response.data.data)
                })
                .catch(error => {
                console.log(error)
                setIsAdmin(false)
                }  
    )
        }).catch(error => {
            console.log(error)
        })
    },[])


    /**
     * Navigate to the modify mode page of the current mode
     */
    const handleModifyGame = () => {

        navigate(`/mode/update/${idMode}`)

    }
    
    /**
     * Delete the current mode and navigate to the game page of the game of the mode
     * @param {React.MouseEvent<HTMLButtonElement>} e - The event of the button click
     */
    const handleDeleteGame = (e) => {

        deleteMode(idMode).then(response => {
            navigate(`/game/${modeData.game.id}`)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="mode-Page">
            
            {!modeData  && <h1>Les données du jeux sont indisponible</h1>}
            {modeData && <>
                <h1>
                   {modeData.game.name}
                </h1>
                <h2>
                    Mode {modeData.name}
                </h2>
            <div className="cont-info">
                <div className="cont-description">
                    <div className="info">
                        <h2>Description</h2>
                        <p>{modeData.description}</p>
                    </div>
                    <div className="info">
                        <h2>Guide d'installations</h2>
                        <p>{modeData.installationGuide}</p>
                    </div>
                    <div className="info">
                        <h2>Regle du calcule des scores</h2>
                        <p>{modeData.scoreRules}</p>
                    </div>
                </div>
            </div>
            {isAdmin && <BtnPrimary labelText={"Modifier le mode"} title={'Modifier le mode'} type={'submit'} onClick={handleModifyGame} />}
            {isAdmin && <BtnPrimary labelText={"Modifier le mode"} title={'Supprimer le mode'} type={'submit'} onClick={handleDeleteGame} />}
            </>
            }
        </div>
    );
}

export default ModePage;
