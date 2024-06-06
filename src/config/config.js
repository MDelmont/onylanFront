
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
    errorGameAlreadyExists:{ target:'name',message:"Ce nom n'est pas disponible."},
};

export const rulesMessage = {
    password: "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre, au moins un caractère spéciaux dans @$!%*?& et avoir au moins 6 caractères.",
};

export const introductionProfil = [
    "Pourquoi dormir quand on peut gagner ?",
    "Quand il ne joue pas, il pense aux jeux. Et quand il joue, il est déjà en train de planifier sa prochaine stratégie.",
    "Je joue, donc je suis.",
    "Occupation : Dominer le monde (virtuellement).",
    "Il est probablement en train de gagner une partie en ligne quelque part. Bonne chance pour le suivre.",
    "La légende dit qu'il est né avec une manette à la main. Et vu ses compétences, on pourrait bien le croire.",
    "Entre deux parties, trouve le temps de dormir... parfois.",
    "Le héros dont le joystick est plus légendaire que l'épée d'Excalibur.",
    "Vous pensez être bon ? Il peut battre un dragon en sirotant son café.",
    "Quand il entre dans un jeu, les serveurs tremblent.",
    "Il pourrait probablement monter un PC les yeux fermés.",
]