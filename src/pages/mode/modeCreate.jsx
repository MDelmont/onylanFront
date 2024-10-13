import { useEffect, useState } from "react";
import { IsAuth } from "../../components/auth/isAuth"
import InputLabel from '../../components/formulaire/inputLabel/inputLabel';
import BtnPrimary from '../../components/basic/btnPrimary/btnPrimary';
import InputPrimary from '../../components/basic/inputPrimary/inputPrimary';
import { useNavigate, useParams } from "react-router-dom";
import { messageErrorsReturnApi } from "../../config/config";
import { createMode } from "../../service/api/game/modeApi";
import { getGamesId } from "../../service/api/game/gameApi";
import '../../styles/mode/modeCreate.scss'

/*************  ✨ Codeium Command ⭐  *************/
/**
 * page create mode
 * @return {JSX.Element}
 */
/******  7995e520-e930-4b5a-9ed4-9836d17a74c2  *******/
const ModeCreatePage = () => {
    IsAuth();
    const navigate = useNavigate();
    const {idGame} = useParams();
    const [gameData, setGameData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        installationGuide: '',
        scoreRules: '',
    });
    const [errors, setError] = useState({
        name: '',
        description: '',
        installationGuide: '',
        scoreRules: '',
    });
    const [globalError, setGlobalError] = useState('');

    useEffect( () =>{
        getGamesId(idGame).then( response => {
            setGameData(response.data.data)
        }).catch(error => {

            console.log(error)
        })


    },[])
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === "file" ? files[0] ? files[0] : formData.file : value;
        setGlobalError("");
        setError({
            ...errors,
            [name]: '',
        });
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit')
        const errorstemp = {
            name: '',
            description: '',
            installationGuide: '',
            scoreRules: '',
        };
        let haveError = false;

        Object.keys(errors).map((key) => {
            if (!['file'].includes(key) & !isNaN(formData[key])) {
                haveError = true
                errorstemp[key] = "Champs obligatoire.";
            }
        })
        if (haveError) {
            setError(errorstemp)
            return false
        }
        formData.idGame = idGame;
        createMode(formData).then(() => {
            navigate(`/game/${idGame}`);
        }).catch((error) => {
                // Erreur de connexion
                const { message, data } = error.response.data
                console.log(message, data)
                if (message == "Invalid data for register") {
                    console.log('is invalid data register')
                    const errorsApi = data.errors
                    const errorsTemp = {...errors}
                    errorsApi.forEach(error => {
                        if (Object.keys(messageErrorsReturnApi).includes(error)) {
                            const { target, message } = messageErrorsReturnApi[error]
                            errorsTemp[target] = message
                        }
                    })
                    setError(errorsTemp)
                } else {
                    setGlobalError("Une erreur c'est produite")
                }
            });
    };

    const dataInput = [
        { htmlFor: "name", title: "Nom *", type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, error: errors.name },
        { htmlFor: "description", title: "Description *", type: "text-area", id: "description", name: "description", value: formData.description, onChange: handleChange, error: errors.description },
        { htmlFor: "installationGuide", title: "Description pour l'installation *", type: "text-area", id: "installationGuide", name: "installationGuide", value: formData.installationGuide, onChange: handleChange, error: errors.installationGuide },
        { htmlFor: "scoreRules", title: "Règles des scores *", type: "text-area", id: "scoreRules", name: "scoreRules", value: formData.scoreRules, onChange: handleChange, error: errors.scoreRules },
    ]
    return (
        <div className="mode-create-Page">
            <h1>
                {gameData && gameData.name} 
                
            </h1>
            <h2>Création d'un mode de jeux </h2>
            <form className='create-mode-form' onSubmit={handleSubmit}>
                <div className="cont-input">

                    {dataInput.map(({ htmlFor, title, type, id, name, value, onChange, error }, index) => {
                        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
                            <InputPrimary type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} />
                        } />
                    })}

                    {globalError && <p>{globalError}</p>}
                </div>
                <BtnPrimary title={'Créer un mode'} type={'submit'} onClick={handleSubmit} />
            </form>
        </div>
    );
}

export default ModeCreatePage;
