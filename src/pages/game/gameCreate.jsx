import { useEffect, useState } from "react";
import { IsAuth } from "../../components/auth/isAuth"
import InputLabel from '../../components/formulaire/inputLabel/inputLabel';
import BtnSecondary from '../../components/basic/btnSecondary/btnSecondary';
import BtnPrimary from '../../components/basic/btnPrimary/btnPrimary';
import InputPrimary from '../../components/basic/inputPrimary/inputPrimary';
import { useNavigate } from "react-router-dom";
import { messageErrorsReturnApi } from "../../config/config";
import { createGame,getConfigGameApi } from "../../service/api/game/gameApi";
import "../../styles/game/gameCreate.scss"
import InputPrimaryDropdown from "../../components/basic/inputPrimaryDropdown/inputPrimaryDropdown";

const GameCreatePage = () => {
    IsAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price:null,
        description: '',
        categorie: '',
        downloadDescription: '',
        file: null,
    });
    const [listCategoryGame,setListCategoryGame] = useState('')

    const [errors, setError] = useState({
        name: '',
        price:'',
        description: '',
        categorie: '',
        downloadDescription: '',
        file: '',
    });
    const [globalError, setGlobalError] = useState('');


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

    const resetPhoto = () => {
        document.getElementById('file').value = '';
        setFormData({
            ...formData,
            file: null,
        });
    }


    const handleChange = (e) => {

        const { name, value, files } = e.target;

        console.log(name, value, files)
        console.log(value ==='')
        let newValue = value;
        if (name === "file"){
            newValue =files[0] ? files[0] : formData.file ;

        }
        if (name ==="price"){
    
            if (value <0 ){
                newValue = 0
            }

        }

        
   
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
    const handleBlur = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        console.log(name, value, files )
        if (value ===''){
            setError({
                ...errors,
                [name]: messageErrorsReturnApi['errorPriceGame'].message
            });
        }
       
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit')
        console.log('formData',formData)
        const errorstemp = {
            name: '',
            price:'',
            description: '',
            categorie: '',
            downloadDescription: '',
            file: '',
        };
        let haveError = false;

        Object.keys(errors).map((key) => {
            if (!['file'].includes(key) & (formData[key] === '' ||  formData[key] == null ||  formData[key] == undefined)) {
                
                haveError = true
                errorstemp[key] = "Champs obligatoire.";
            }
        })

        if(formData.price ===""){
            haveError=true
            errorstemp['price'] = messageErrorsReturnApi['errorPriceGame'].message;
        }
        if (haveError) {
            setError(errorstemp)
            return false
        }


        
        createGame(formData).then((response) => {
            console.log(response)
            navigate("/games")
        })
            .catch((error) => {
                // Erreur de connexion
                const { message, data } = error.response.data
                console.log(message, data)
                if (message == "Invalid data for create game") {
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

    const dataInput = [
        { htmlFor: "name", title: "Nom *", type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, error: errors.name },
        { htmlFor: "price", title: "Prix *", type: "number", id: "price", name: "price", value: formData.price, onChange: handleChange, error: errors.price, onBlur:handleBlur },
        { htmlFor: "description", title: "Description *", type: "text-area", id: "description", name: "description", value: formData.description, onChange: handleChange, error: errors.description },
        { htmlFor: "downloadDescription", title: "Description pour le téléchargement *", type: "text-area", id: "downloadDescription", name: "downloadDescription", value: formData.downloadDescription, onChange: handleChange, error: errors.downloadDescription },
    ]

    return (
        <div className="create-game-page">
            <h1>
                Création d'un Jeux
            </h1>
            <form className='create-page-form' onSubmit={handleSubmit}>
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

                    {dataInput.map(({ htmlFor, title, type, id, name, value, onChange, error, onBlur }, index) => {
                        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
                            <InputPrimary type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur}/>
                        } />
                    })}
                    <InputLabel htmlFor="categorie" title="Categorie*" input={
                        <InputPrimaryDropdown name={"categorie"} id={"categorie"}  onChange={handleChange} options={listCategoryGame} messageError={errors.categorie} value={formData.categorie}/>
                
                    } />

                    {globalError && <p>{globalError}</p>}
                </div>
                <BtnPrimary title={'Créer un jeu'} type={'submit'} onClick={handleSubmit} />
            </form>
        </div>
    );
}

export default GameCreatePage;
