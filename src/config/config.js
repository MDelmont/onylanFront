
export const constFormulaire = {
    regexEmail:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    passwordSize: 6,
    majRegex: /^(?=.*[A-Z])/, // Le mot de passe doit contenir au moins une lettre majuscule.
    minRegex: /^(?=.*[a-z])/, // Le mot de passe doit contenir au moins une lettre minuscule.
    digitRegex: /^(?=.*\d)/, // Vérifie la présence d'au moins un chiffre.
    specialCharRegex: /^(?=.*[@$!%*?&])/, // Vérifie la présence d'au moins un caractère spécial parmi @$!%*?&.
};

export const messageErrors = {
    regexEmail: "Email invalide.",
    password : "Mot de passe invalide.",
    confirmPassword : "Le mot de passe n'est pas identique."
};


export const appConfig = {
    urlFront : "http://localhost:5173"
};


export const messageErrorsReturnApi = {
    errorEmailAlreadyExists: { target:'email', message:"Cette email n'est pas disponible." },
    errorPseudoAlreadyExists: { target:'pseudo',message:"Ce pseudo n'est pas disponible."},
    badEmailError:{target:'email',message:"Email invalide."},
    badPasswordError:{target:'password',message:"Password invalide."},
};

export const rulesMessage = {
    password: "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre, au moins un caractère spéciaux dans @$!%*?& et avoir au moins 6 caractères.",
};