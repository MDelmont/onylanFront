import React, { useEffect, useState } from "react";
import "./cookieBanner.scss";
import BtnPrimary from "../basic/btnPrimary/btnPrimary";

/**
 * Composant CookieBanner pour accepter les conditions d'utilisation des cookies
 * @returns {JSX.Element} Le bandeau de cookies
 */
const CookieBanner = () => {
    // État pour gérer l'affichage du bandeau
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        
        // vérifier que le cookiesAccepted est dans le local storage
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        console.log('cookiesAccepted',cookiesAccepted)
        if (!cookiesAccepted) {
            setIsVisible(true);
        }
    })
    // Fonction pour gérer l'acceptation des cookies
    const handleAcceptCookies = (response) => {
        // Ici, vous pouvez également ajouter la logique pour stocker l'acceptation dans un cookie ou un localStorage
        setIsVisible(false);
        // Exemple de stockage dans localStorage
        localStorage.setItem('cookiesAccepted', response);
    };

    // Si le bandeau n'est pas visible, ne rien afficher
    if (!isVisible) {
        return null;
    }

    return (
        <div className="cookie-banner">
            <h2>Acceptation des cookies</h2>
            <p>
                Ce site utilise des cookies pour améliorer votre expérience.
                En utilisant notre site, vous consentez à notre politique sur les cookies.
                Voir <a href="/conditions-of-use">conditions d'utilisation</a> du site.
            </p>
            <BtnPrimary title="Accepter" onClick={() => handleAcceptCookies(true)} />
            <BtnPrimary title="Refuser" onClick={() => handleAcceptCookies(false)} />
        </div>
    );
};

export default CookieBanner;
