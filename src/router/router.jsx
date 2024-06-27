import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import TestPage from "../pages/test";
import Footer from "../components/footer";
import ProfilPage from "../pages/profil";
import DashbordPage from "../pages/dashboard";
import EquipePage from "../pages/equipe";
import InvitePage from "../pages/invite";
import ForgetPasswordPage from "../pages/forgetPassword";
import ResetPasswordPage from "../pages/resetPassword";
import InviteListPage from "../pages/inviteList";
import NavBar from "../components/navBar/navBar";
import GamePage from "../pages/game/game";
import GamesPage from "../pages/game/games";
import GameCreatePage from "../pages/game/gameCreate";
import ModePage from "../pages/mode/mode";
import ModeCreatePage from "../pages/mode/modeCreate";
import EventPage from "../pages/event";
import Background from "../components/background/background";
import '../styles/root.scss'
import GameUpdatePage from "../pages/game/gameUpdate";
import KeyPassPage from "../pages/keypass";
import PlayerPage from "../pages/players";
import ModeUpdatePage from "../pages/mode/modeUpdate";
/**
 * creat template of page with nav and content
 * @returns Template of page
 */
const Root = () => {
  return (
    <div id="root" className="dark">
      
      
      <main >
        
        <Outlet />
      </main>
      <NavBar />
      <Background />
      {/* <Footer /> */}
    
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "register/:idToken",
        element: <RegisterPage />,
      },
      {
        path: "invite/new",
        element: <InvitePage />,
      },
      {
        path: "invite/list", 
        element: <InviteListPage />,
      },
      {
        path: "players",
        element: <PlayerPage />,
      },
      {
        path: "profile",
        element: <ProfilPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgetPassword",
        element: <ForgetPasswordPage />,
      },
      {
        path: "resetPassword/:idToken",
        element: <ResetPasswordPage />,
      },
      {
        path: "teams",
        element: <EquipePage />,
      },
      {
        path: "dashboard",
        element: <DashbordPage />,
      },
      {
        path: "games",
        element: <GamesPage />,
      },
      {
        path: "game/:idGame",
        element: <GamePage />,
      },
      {
        path: "game/update/:idGame",
        element: <GameUpdatePage />,
      },
      {
        path: "game/create",
        element: <GameCreatePage />,
      },
      {
        path: "mode/:idMode",
        element: <ModePage />,
      },
      {
        path: "mode/create/:idGame",
        element: <ModeCreatePage />,
      },
      {
        path: "mode/update/:idMode",
        element: <ModeUpdatePage />,
      },
      {
        path: "keypass",
        element: <KeyPassPage />,
      },
      {
        path: "events",
        element: <EventPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
    ],
  },
  {
    path:"*",
    element: <Root />,
    children: [
      {
        path: "*",
        element: <HomePage />,
      },
    ]
  }
]);

