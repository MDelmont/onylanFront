
import "./userCard.scss"


/**
 * @function UserCard
 * @description component for user card
 * @param {Object} user - user object to display
 * @returns {ReactElement} - react element of user card
 */
const UserCard = ({user}) => {
  
  // const navigate = useNavigate()
  
  // const handleClick = (e) =>{
  //   const {className} = e.target
  //   const classNameRedirect = ['game-card','cont-img','title-cont']
  //   if (classNameRedirect.includes(className)){

  //       navigate(`/game/${game.id}`);
  //   }
    
  // }


  return <div className="user-card" >
    
    <div className="cont-img">

      <img className="img-card" src={user.file ? user.file:'/logo_onylan.png'}></img>

    </div>
    <div className="title-cont">

    <p className="title">{user.pseudo}</p>
    </div>
      
  </div>
}

export default UserCard;
