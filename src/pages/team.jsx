import {IsAuth} from "../components/auth/isAuth"
const  TeamPage = ()  => {
  IsAuth()
  return (
    <div className="team-Page">
        <h1>
        Team
        </h1>
    </div>
  );
}

export default TeamPage;
