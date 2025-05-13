import { useRoutes } from "react-router-dom";
import Authlayout from "../layouts/AuthLayout/Authlayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/home/HomePage";
import ReportsPage from "../pages/reports/ReportsPage";
import CoachesPage from "../pages/coaches/CoachesPage";
import WorkoutsPage from "../pages/workouts/WorkoutsPage";
import CoachDetailPage from "../pages/coaches/CoachDetailPage";
import ClientProfile from "../pages/account/clientAccount/ClientProfile";
import CoachProfile from "../pages/account/coachAccount/coachProfile";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AppRoutes = () => {
  const { userData } = useAuth();

  const routes = useRoutes([
    {
      path: "/auth",
      element: <Authlayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element:
            userData?.role === "Coach" ? (
              <Navigate to="/workouts" replace />
            ) : (
              <HomePage />
            ),
        },
        { path: "workouts", element: <WorkoutsPage /> },
        {
          path: "coaches",
          element:
            userData?.role === "Coach" ? (
              <Navigate to="/" replace />
            ) : (
              <CoachesPage />
            ),
        },
        {
          path: "coaches/:coachId",
          element:
            userData?.role === "Coach" ? (
              <Navigate to="/" replace />
            ) : (
              <CoachDetailPage />
            ),
        },
        { path: "reports", element: <ReportsPage /> },
        // { path: "profile", element: <CoachProfile /> },
      ],
    },
    {
      path: "users",
      element: <MainLayout />,
      children: [
        { path: "clientId", element: <ClientProfile /> },
        { path: "coachId", element: <CoachProfile /> },
      ],
    },
    { path: "*", element: <div>404 - Page Not Found</div> },
  ]);

  return routes;
};

export default AppRoutes;
