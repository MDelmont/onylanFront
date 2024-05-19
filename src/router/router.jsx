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
import ForgetPassword from "../pages/forgetPassword";
import InviteListPage from "../pages/inviteList";
import NavBar from "../components/navBar/navBar";
import GamePage from "../pages/game";
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
        element: <ForgetPassword />,
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
        element: <GamePage />,
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
]);

