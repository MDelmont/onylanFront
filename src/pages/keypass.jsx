import { useEffect, useState } from "react";
import InputLabel from '../components/formulaire/inputLabel/inputLabel';
import BtnPrimary from '../components/basic/btnPrimary/btnPrimary';
import InputPrimary from '../components/basic/inputPrimary/inputPrimary';
import { useNavigate } from "react-router-dom";
import { messageErrorsReturnApi } from "../config/config";
import "../styles/game/gameCreate.scss"
import { IsAuth } from "../components/auth/isAuth";
import { askKeyPass } from "../service/api/keypass/keypassApi";

const KeyPassPage = () => {
    IsAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ask: '',
    });

    const [errors, setError] = useState({
        ask: '',
    });
    const [responseData, setResponseData] = useState('');
    const [globalError, setGlobalError] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === "file" ? files[0] ? files[0] : formData.file : value;
        setGlobalError("");
        setResponseData("");
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
        console.log('formData', formData);
        const errorstemp = {
            ask: '',
        };
        let haveError = false;

        Object.keys(errors).map((key) => {
            if (!isNaN(formData[key])) {
                haveError = true
                errorstemp[key] = "Champs obligatoire.";
            }
        })
        if (haveError) {
            setError(errorstemp)
            return false
        }

        askKeyPass(formData).then((response) => {
            setResponseData(response.data.data);
            navigate("/keypass")
        })
            .catch((error) => {
                // Erreur de connexion
                const { message, data } = error.response.data
                console.log(message, data)
                if (message == "Invalid data for keypass") {
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
        { htmlFor: "ask", title: "Proposition", type: "text", id: "ask", name: "ask", value: formData.ask, onChange: handleChange, error: errors.ask },
    ]

    return (
        <div className="create-game-page">
            <div className="home-Page">
                <div className="description">
                    <h1 className="cont-title">
                        <span className="title">OnyClue</span><span className="date"></span>
                    </h1>
                    <h3>Bienvenue sur OnyClue</h3>
                    <p>OnyClue va être votre meilleur ami pour réussir à deviner le mot clé. <br /> Je le rappelle le premier à trouver le mot clé gagnera une récompense. <br />
                        OnyClue a été programmé avec une liste de mot limité, il est donc important de respecter les consignes suivantes: pas de majuscule, pas d'accent, pas d'anglais. <br />
                        Il est possible qu'un indice soit un groupe de mot mais généralement ce sera un mot unique. <br />
                        Bonne chance dans votre quête. </p>
                </div>
            </div>
            <form className='create-page-form' onSubmit={handleSubmit}>
                <div className="cont-input">
                    {dataInput.map(({ htmlFor, title, type, id, name, value, onChange, error }, index) => {
                        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
                            <InputPrimary type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} />
                        } />
                    })}
                    {globalError && <p>{globalError}</p>}
                </div>
                <BtnPrimary title={'Proposer'} type={'submit'} onClick={handleSubmit} />
                <div><p>{responseData}</p></div>
            </form>
        </div>
    );
}

export default KeyPassPage;
