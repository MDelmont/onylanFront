import { useMemo, useState } from "react";
import Timer from "../components/timer/timer";
import TrophieModel from "../components/trophieModel";
import useCustomTimer from "../hook/useCustomTimer";
import '../styles/homepage.scss'
import ContTimer from "../components/timer/contTimer";

/**
 * HomePage is the main page of the website. It contains a model of the trophy to win, a countdown timer to the start of the event, and some information about the event.
 * @returns {JSX.Element} The main page of the website.
 */
const HomePage = () => {

    const trophieModelData = {
        camera:{
            fov:10,
            position:{
                z:315,
            }
        },
        axeHelper:false,
        isRotate:true,
        urlFile: "trophe2024.glb",
        glbFile:null,
        color:"#ff843d",
        rotation : {
            axes : {
              x:1.8,
              y:0,
              z:0.7,
            },
            piece :{
              x:0,
              y:0,
              z:0,
            },
            speed:0.005,
           
          },
        translation : {
          x:-7.5,
          y:-7.5,
          z:25,
        },
    }
    return (
        <div className="home-Page">
            <div className="content-grid">
                <h1 className="cont-title">
                    <span className="title">Onylan Erebus</span><span className="date">(2024)</span>
                </h1>
                <iframe className="teaser" src="https://www.youtube.com/embed/H4Obf4nDKpk" frameBorder="0" allowFullScreen />

                <div className="info-cont">
                    <p>
                        Bienvenue sur le site officiel de la Onylan. <br /> Organisez-vous et préparez-vous pour des événements mémorables. <br />Inscrivez-vous dès maintenant pour la Onylan Erebus (Onylan 2024).
                    
                    
                    </p>
                    <div className="orange-barre"></div>
                </div>

                <div className="cont-timer">
                    <h2>Temps avant le début de la lan</h2>
                    <ContTimer />
                </div>
            </div>
            <div className="description">
                <div className="trophe">
                <h2>Trophé à gagner</h2>
                <TrophieModel trophieModelData={trophieModelData}  modifyPosition={true} screenSize={{x:300,y:500}}/>
                </div>
            <div className="start-text">
                        <h3>Prémices</h3>
                        <p>
                        En vue des événements à venir et passés,
                        nous avons créé ce site pour améliorer notre organisation lors des Onylans et résoudre les problèmes rencontrés lors du premier événement. <br />
                        Le site est encore en construction, donc certaines fonctionnalités ne sont pas encore disponibles.<br />
                        Cependant, si vous avez reçu une invitation, vous pouvez dès à présent vous inscrire pour participer à la Onylan Erebus (Onylan 2024).<br />
                        </p>
                    </div>
                    
                <h3>En ce qui concerne le déroulement de la LAN</h3>

                 
                <div className="desc-content">
                    <div className="desc-left">
                        <h4>Ce qui ne change pas</h4>
                        <ul>
                            <li>Plusieurs équipes formées aléatoirement</li>
                            <li>Plusieurs semaines d'entraînement sur une sélection de jeux</li>
                            <li>Une date définie selon le planning de chacun, pour se retrouver lors d'une journée entière</li>
                            <li>Un lieu où se retrouver (qui ne sera pas forcément le même que l'année dernière)</li>
                            <li>Des surprises...</li>
                        </ul></div>
                    <div className="desc-middle">
                        <h4>Ce qui change</h4>
                        <ul>
                            <li>Pas de précipitation dans l'organisation</li>
                            <li>Un budget d'achat défini en fonction des envies et des limites de chacun</li>
                            <li>Des jeux proposés par les participants, plutôt que des jeux imposés. Mais le choix final sera fait par moi en fonction des types de jeux, du budget imposé, et de la jouabilité du jeu en fonction du format (nombre de teams, règles particulières pour les affrontements)</li>
                        </ul></div>
                    <div className="desc-right">
                        <h4>Zones d'ombre</h4>
                        <ul>
                            <li>Y aura-t-il un nouveau trophée ?</li>
                            <li>Nombre de participants et nombre par équipe</li>
                            <li>Budget pour l'achat de jeux</li>
                            <li>Nombre de jeux joués</li>
                        </ul></div>
                </div>
                <br />
                <div className="desc-middle-large">
                    <h3>Invitations et participants</h3>
                    <p>
                        Vous êtes 9 à avoir reçu une invitation, et il y a des personnes sur liste d'attente en cas d'absence ou de refus de participation. <br />
                        Sans invitation, vous ne pouvez pas vous inscrire. <br />
                        Une participation entre 8 et 10 personnes est attendue, avec une préférence pour le format de 3 équipes de 3 personnes. Il est cependant envisageable de faire 4 ou 5 équipes de 2 personnes, en fonction du nombre de participants et des jeux proposés.
                    </p> <br />
                    <h3>Jeux et budget</h3>
                    <p>Lors de votre inscription, vous devez choisir une fourchette du montant que vous êtes prêts à débourser en jeux. <br />
                        Cela permet aux différents participants de proposer des jeux, même s'ils ne sont pas gratuits, dans la limite du raisonnable bien sûr. <br />
                        Il est préférable de choisir 4 jeux différents à 20€ plutôt que le dernier Call of Duty à 80€. Cela permettra d'élargir le choix et de découvrir de nouvelles choses, sans être bloqué à devoir choisir uniquement des jeux gratuits. <br /> <br />
                        Les jeux de la précédente édition sont proposés par défaut, ce qui signifie qu'il est tout à fait possible de revoir certains de ces jeux lors de nouvelles éditions. Il est aussi possible de proposer le même jeu plusieurs fois mais avec des mods différents. Ex : Minecraft (Bedwars ou Mineral Contest), veuillez donc bien noter le nom du mod si vous le proposez. <br />
                        Le participant ayant proposé un jeu est tenu d'expliquer le format d'affrontement qu'il souhaite mettre en place, ainsi que d'indiquer les manipulations à faire pour que tous les joueurs puissent mettre en place le jeu et s'entraîner. Exemple : ce que Matthieu et Vicktor ont fait avec Trackmania : explication des règles + choix des maps + explications de l'installation des maps. <br />
                        Si possible, évitez des jeux où vous avez 2000 heures dessus, pour que cela reste équilibré. Bien sûr, des exceptions sont possibles si le jeu se prête parfaitement à l'événement.
                    </p> <br />
                    <h3>Obligations</h3>
                    <p>Chaque participant s'engage à respecter les règles suivantes :</p>
                    <ul>
                        <li>Du try hard avec son équipe</li>
                        <li>Accepter les équipes qui seront formées</li>
                        <li>Participer à des sessions d'entraînement avec les autres équipes (afin que l'on puisse s'amuser tous ensemble)</li>
                        <li>Venir le jour de la LAN avec son matériel</li>
                        <li>Accepter le choix des jeux, personne ne pourra être content de tous les jeux</li>
                        <li>Accepter le choix du budget</li>
                        <li>Faire en sorte de pouvoir lancer tous les jeux et y jouer convenablement, surtout le jour de la LAN</li>
                        <li>De l'investissement (oui, c'est la même chose que le try hard, mais c'est le plus important)</li>
                    </ul>
                    <p> 
                        Surtout, n'oubliez pas, l'objectif de la Onylan est de s'amuser tous ensemble, de découvrir de nouveaux jeux et d'y jouer ensemble, le tout en nous donnant un objectif de battre nos amis à la loyale lors d'une journée exceptionnelle. <br /> <br /> <br />
                        Si vous êtes prêts, inscrivez-vous dès maintenant.</p>
                </div>
            </div >
        </div >
    );
}

export default HomePage;
