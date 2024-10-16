
export const headerChoice = [

    {
        name : 'Profil',
        path:'/profile',
        isAdmin : false,
        forAdmin : false,
    },
    {
        name : 'Joueurs',
        path:'/players',
        isAdmin : false,
        forAdmin : true,
        
    },
    // {
    //     name : 'Évenement',
    //     path:'/events',
    //     isAdmin : false,
        
    // },
    {
        name : 'Jeux',
        path:'/games',
        isAdmin : false,
        forAdmin : true,
        
    },
    // {
    //     name : 'Equipes',
    //     path :'/teams',
    //     isAdmin : false,
    // },
    // {
    //     name : 'Tableau de bord',
    //     path :'/dashboard',
    //     isAdmin : false,
    // },
    {
        name : 'Indices',
        path :'/keypass',
        isAdmin : false,
        forAdmin : true,
    },
    // {
    //     name : 'test',
    //     path :'/test',
    //     isAdmin : false,
    // },
    {
        name : 'Invitations',
        path :'/invite/list',
        isAdmin : true,
        forAdmin : true,
    },
]
