import { useEffect, useState } from "react";
import '../styles/dashboardPage.scss';
import {IsAdmin} from "../components/auth/isAdmin"
import { deleteInvitation,allInvitation } from "../service/api/user/initationApi";
import { allGames, deleteGame } from "../service/api/game/gameApi";
import { allUsers } from "../service/api/user/userApi";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal/modal";
const BASE_URL = import.meta.env.VITE_FRONT_URL;
/**
 * @function DashbordPage
 * @description This component is the main page of the application.
 *              It displays a message with a link to the login page if the user is not connected.
 *              Otherwise, it displays a message with a link to the logout page.
 * @returns {ReactElement} The component.
 */
const  DashbordPage = ()  => {
  IsAdmin()
  const navigate = useNavigate();

  const [invitations, setInviations] = useState(null)
  const [games, setGames] = useState(null)
  const [users, setUsers] = useState(null)
  
  useEffect (() => {
    console.log('Start get invitation')
    allInvitation()
      .then(response => {
        console.log(response.data.invitation)
        setInviations(response.data.data.invitation)
      })
      .catch(error => {
        console.log(error)
      })

      console.log('Start get Users')
      allUsers().then( resp => {
        console.log(resp.data.data)
        setUsers(resp.data.data)
   
    }).catch(error =>{
      console.log(error)

    })

    console.log('Start get games')
    allGames()
    .then(response => {
        setGames(response.data.data)
    })
    .catch(error => {
        console.log(error)
    })
  },[])


  const handleRemoveInvit = (e) => {
    const id = e.currentTarget.id

    deleteInvitation(id)
      .then(response => {
        allInvitation()
        .then(response => {
          setInviations(response.data.data.invitation)
        })
      .catch(error => {
        console.log(error)
      })
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleOpenNewInvitation = (e) => {
    navigate('/invite/new')
  }
  

  const handleOpenNewgame = (e) => {
    navigate('/game/create')
  }

  const handleUpdateGame = (e) => {
    const id = e.currentTarget.id
    navigate(`/game/update/${id}`)
  }


  const handleDeleteGame = (e) => {
    const id = e.currentTarget.id
    deleteGame(id).then(response => {
      allGames()
      .then(response => {
          setGames(response.data.data)
      })
      .catch(error => {
          console.log(error)
      })
    }).catch(error => {
        console.log(error)

    })
}
  return (
    <div className="dashboard-page">
        <h1>
          Tableau de bord
        </h1>
        <div className="dash-part-cont">
          <h2>Gestion des inviations</h2>
          <BtnPrimary onClick={handleOpenNewInvitation} id={'new-invit-btn'} title="Nouvelle invitation" /> 
          {invitations && invitations.length >0 && <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invitations && invitations.map((invitation) => (
                <tr key={invitation.id}>
                  <td>{invitation.user.name}</td>
                  <td>{invitation.user.firstName}</td>
                  <td>
                    <a href={`${BASE_URL}/register/${invitation.token}`}>{BASE_URL}/register/{invitation.token}</a>
                  </td>
                  <td>
                  <Modal btnUse={<BtnPrimary title={'Annuler l\'invitation'} />}>
                      <div className="modal-cent-confirmation">
                        <h2>Etes vous sur de vouloir supprimer l'invitation ? </h2>
                        <BtnPrimary onClick={handleRemoveInvit} id={invitation.id} title="Confirmer la suppression"/>
                      </div>
                    </Modal>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>

        <div className="dash-part-cont">
        <h2>Gestion des utilisateurs</h2> 
          {users && users.length >0 && <table className="admin-table">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Surnom</th>
                <th>email</th>
                <th>Budget</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.name}</td>
                  <td>{user.pseudo}</td>
                  <td>{user.email}</td>
                  <td>{user.budget}</td>
                  <td className="action-td">
                  <BtnPrimary onClick={handleUpdateGame} id={user.id} title="Modifier l'utilisateur"/>
                    <Modal btnUse={<BtnPrimary title={"Supprimer l'utilisateur"} />}>
                      <div className="modal-cent-confirmation">
                        <h2>Etes vous sur de vouloir supprimer l'utilisateur {user.firstName} {user.name} ? </h2>
                        <BtnPrimary onClick={handleDeleteGame} id={user.id} title="Confirmer la suppression"/>
                      </div>
                    </Modal>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>

        <div className="dash-part-cont">
          <h2>Gestion des jeux</h2>
          <BtnPrimary onClick={handleOpenNewgame} id={'new-invit-btn'} title="Nouveau jeux" /> 
          {games && games.length >0 && <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>catégorie</th>
                <th>Note moyenne</th>
                <th>Nombre de note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {games && games.map((game) => (
                <tr key={game.id}>
                  <td>{game.name}</td>
                  <td>{game.categorie}</td>
                  <td>{game.noteStat?._avg.note}</td>
                  <td>{game.noteStat?._count.note}</td>
                  <td className="action-td">
                    <BtnPrimary onClick={handleUpdateGame} id={game.id} title="Modifier le jeux"/>
                    <Modal btnUse={<BtnPrimary title={'Supprimer le jeu'} />}>
                      <div className="modal-cent-confirmation">
                        <h2>Etes vous sur de vouloir supprimer le jeu {game.name} ? </h2>
                        <BtnPrimary onClick={handleDeleteGame} id={game.id} title="Confirmer la suppression"/>
                      </div>
                    </Modal>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
    </div>
  );
}

export default DashbordPage;
