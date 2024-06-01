import { useState } from "react";
import { IsAuth } from "../components/auth/isAuth"
import InputLabel from '../components/formulaire/inputLabel/inputLabel';
import BtnSecondary from '../components/basic/btnSecondary/btnSecondary';
import BtnPrimary from '../components/basic/btnPrimary/btnPrimary';
import InputPrimary from '../components/basic/inputPrimary/inputPrimary';
import { useNavigate } from "react-router-dom";
import { messageErrorsReturnApi } from "../config/config";
import { createGame } from "../service/api/game/gameApi";


const ModePage = () => {
    IsAuth();
    const navigate = useNavigate();
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

    const handleNavigateUpdate = (e) => {
        e.preventDefault();
        console.log('submit')
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
        createGame(formData).then(() => {
            navigate("/games")
        })
            .catch((error) => {
                // Erreur de connexion
                const { message, data } = error.response.data
                console.log(message, data)
                if (message == "Invalid data for register") {
                    console.log('is invalid data register')
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
        { htmlFor: "description", title: "Description *", type: "text", id: "description", name: "description", value: formData.description, onChange: handleChange, error: errors.description },
        { htmlFor: "downloadDescription", title: "Description pour le téléchargement *", type: "text", id: "downloadDescription", name: "downloadDescription", value: formData.downloadDescription, onChange: handleChange, error: errors.downloadDescription },
        { htmlFor: "categorie", title: "Catégorie *", type: "text", id: "categorie", name: "categorie", value: formData.categorie, onChange: handleChange, error: errors.categorie },
    ]

    const handleNavigateMode = (e) => {
        e.preventDefault();
        navigate('/mode/create');
    };

    return (
        <div className="game-Page">
            <h1>
                Présentation d'un Jeux
            </h1>
            <form className='register-form' onSubmit={handleNavigateUpdate}>
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

                    {globalError && <p>{globalError}</p>}
                </div>
                <BtnPrimary title={'Modifier le jeu'} type={'submit'} onClick={handleNavigateUpdate} /> 
                <BtnPrimary title={'Créer un mode'} type={'submit'} onClick={handleNavigateMode} />
            </form>
        </div>
    );
}

export default ModePage;
