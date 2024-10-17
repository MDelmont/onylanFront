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
                  <td className="action-td">
                  <Modal btnUse={
                     <svg className="icon-btn"  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                  }>
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
                    <div className="icon-btn-cont">
                  <svg className="icon-btn" onClick={handleUpdateGame}  id={user.id}  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                  {/* <BtnPrimary onClick={handleUpdateGame} id={user.id} title="Modifier l'utilisateur"/> */}
                    <Modal btnUse={
                      <svg className="icon-btn"  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    }>
                      <div className="modal-cent-confirmation">
                        <h2>Etes vous sur de vouloir supprimer l'utilisateur {user.firstName} {user.name} ? </h2>
                        <BtnPrimary onClick={handleDeleteGame} id={user.id} title="Confirmer la suppression"/>
                      </div>
                    </Modal>
                    </div>
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
                  <div className="icon-btn-cont">
                  <svg className="icon-btn" onClick={handleUpdateGame}  id={game.id}  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    {/* <BtnPrimary onClick={handleUpdateGame} id={game.id} title="Modifier le jeux"/> */}
                    <Modal btnUse={
                      <svg className="icon-btn"  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    }>
                      <div className="modal-cent-confirmation">
                        <h2>Etes vous sur de vouloir supprimer le jeu {game.name} ? </h2>
                        <BtnPrimary onClick={handleDeleteGame} id={game.id} title="Confirmer la suppression"/>
                      </div>
                    </Modal>
                    </div>
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
