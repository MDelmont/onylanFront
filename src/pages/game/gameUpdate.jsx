import { useEffect, useState } from "react";
import { IsAuth } from "../../components/auth/isAuth"
import { IsAdmin } from "../../components/auth/isAdmin"
import InputLabel from '../../components/formulaire/inputLabel/inputLabel';
import BtnSecondary from '../../components/basic/btnSecondary/btnSecondary';
import BtnPrimary from '../../components/basic/btnPrimary/btnPrimary';
import InputPrimary from '../../components/basic/inputPrimary/inputPrimary';
import { useNavigate, useParams } from "react-router-dom";
import { messageErrorsReturnApi } from "../../config/config";
import {  getGamesId, updateGame, deleteGame, getConfigGameApi } from "../../service/api/game/gameApi";
import "../../styles/game/gameCreate.scss"
import utilsFunction from "../../utils/utilsFunction";
import InputPrimaryDropdown from "../../components/basic/inputPrimaryDropdown/inputPrimaryDropdown";

const GameUpdatePage = () => {
    IsAdmin();
    const navigate = useNavigate();
    const {idGame} = useParams()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categorie: '',
        downloadDescription: '',
        file: null,
    });


    const [errors, setError] = useState({
        name: '',
        description: '',
        categorie: '',
        downloadDescription: '',
        file: '',
    });
    const [globalError, setGlobalError] = useState('');
    const [listCategoryGame,setListCategoryGame] = useState('')
    useEffect( () => {
        getConfigGameApi().then(response => {
            console.log(response)
            response.data.data.game.categorie.unshift('')
            setListCategoryGame( response.data.data.game.categorie)
        }).catch(error => {
            console.log(error)

            setListCategoryGame(['','RTS', 'FPS/TPS', 'MOBA', 'RPG', 'Course', 'Autres'])
        })
    },[])
    useEffect(() => {
        getGamesId(idGame).then(response => {
            console.log(response)

            const base64img = response.data.data.pictureUrl
            console.log(base64img)
            let file;
            if (base64img){
                file = utilsFunction.dataURLtoFile(base64img,"temp.jpg")
            }
        
            setFormData({ ...formData, ...response.data.data, file:file })
 
        }).catch(error => {
            console.log(error)
            setGlobalError('Une erreur est survenu')
        })

    },[])
    const resetPhoto = () => {
        document.getElementById('file').value = '';
        setFormData({
            ...formData,
            file: null,
        });
    }


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
        console.log('formData',formData)
        const errorstemp = {
            name: '',
            description: '',
            categorie: '',
            downloadDescription: '',
            file: '',
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


        updateGame(formData,idGame).then((response) => {
            console.log(response)
            navigate("/games")
        })
            .catch((error) => {
                // Erreur de connexion
                const { message, data } = error.response.data
                console.log(message, data)
                if (message == "Invalid data for create game") {
                    console.log('is invalid data create game')
                    const errorsApi = data.errors
                    const errorsTemp = { ...errors }
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
                console.log(error.response.data.data.errors)

            });
    };
    const handleDelete = (e) => {
        e.preventDefault()
        deleteGame(idGame).then(response => {
            console.log(response)
            navigate("/games")
        }).catch(error => {
            console.log(error)
   
        })
    }

    const dataInput = [
        { htmlFor: "name", title: "Nom *", type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, error: errors.name },
        { htmlFor: "description", title: "Description *", type: "text-area", id: "description", name: "description", value: formData.description, onChange: handleChange, error: errors.description },
        { htmlFor: "downloadDescription", title: "Description pour le téléchargement *", type: "text-area", id: "downloadDescription", name: "downloadDescription", value: formData.downloadDescription, onChange: handleChange, error: errors.downloadDescription },
    ]

    return (
        <div className="create-game-page">
            <h1>
                Modification d'un Jeux
            </h1>
            <form className='create-page-form' >
                <div className="cont-input">

                    <InputLabel htmlFor={"photo"} title={"Photo"} input={
                        <div className='cont-img-input'>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleChange}

                            />

                            {!formData.file && <BtnSecondary type={"button"} title={"Choisir un fichier"} onClick={() => {
                                resetPhoto()
                                document.getElementById('file').click()
                            }} />}
                            {formData.file && (
                                <div className='img-del'>

                                    <img
                                        src={URL.createObjectURL(formData.file)}
                                        alt="Uploaded"
                                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                                    />
                                    {formData.file && <BtnSecondary title={"Supprimer la photo"} onClick={resetPhoto} />}

                                </div>

                            )}
                        </div>
                    } />

                    {dataInput.map(({ htmlFor, title, type, id, name, value, onChange, error }, index) => {
                        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
                            <InputPrimary type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} />
                        } />
                    })}
                     <InputLabel htmlFor="categorie" title="Categorie*" input={
                        <InputPrimaryDropdown name={"categorie"} id={"categorie"}  onChange={handleChange} options={listCategoryGame} messageError={errors.categorie} value={formData.categorie}/>
                
                    } />
                    {globalError && <p>{globalError}</p>}
                </div>
                <BtnPrimary title={'Modifier le jeux'} type={'submit'} onClick={handleSubmit} />
                <BtnPrimary title={'Supprimer le jeux'}  onClick={handleDelete} />
                
            </form>
            
        </div>
    );
}

export default GameUpdatePage;
