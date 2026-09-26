import { useState } from "react";
import Hero from "./components/Hero";
import ContextProvider from "./context/GlobalContext";
import ScrollProgress from "./components/ScrollProgress";
import MsgSentToast from "./components/MsgSentToast";
import Loader from "./components/Loader";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./admin/components/Login";
import DashBoard from "./admin/components/DashBoard";
import { useAdminContext } from "./admin/context/AdminContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { userData, isloggedin } = useAdminContext();
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();
  if (isLoading && !location.pathname.startsWith("/auth/secret")) {
    return <Loader isLoading={isLoading} setisLoading={setisLoading} />;
  }
  return (
    <div className="w-full min-h-screen overflow-hidden bg-[#001012] text-white">
      <ToastContainer theme="colored" closeOnClick={true} draggable />
      <Routes>
        <Route
          path="/"
          element={
            <ContextProvider>
              <Hero />
              <MsgSentToast />
              <ScrollProgress />
            </ContextProvider>
          }
        />

        <Route
          path="/auth/secret/admin-login"
          element={
            <ContextProvider>
              <Login />
            </ContextProvider>
          }
        />

        <Route
          path="/auth/secret/admin/dashboard"
          element={
            userData && isloggedin ? (
              <DashBoard />
            ) : (
              <Navigate to="/auth/secret/admin-login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
