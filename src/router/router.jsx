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
import GamePage from "../pages/game";
import GamesPage from "../pages/games";
import GameCreatePage from "../pages/gameCreate";
import ModePage from "../pages/mode";
import ModeCreatePage from "../pages/modeCreate";
import EventPage from "../pages/event";
import Background from "../components/background/background";
import '../styles/root.scss'
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
        path: "game/create",
        element: <GameCreatePage />,
      },
      {
        path: "mode/:idMode",
        element: <ModePage />,
      },
      {
        path: "mode/create",
        element: <ModeCreatePage />,
      },
      {
        path: "events",
        element: <EventPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      // {
      //   path: "test",
      //   element: <TestPage />,
      // },
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

