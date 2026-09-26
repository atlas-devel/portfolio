import { useContext } from "react";
import { AdminContextAuth } from "../context/AdminContext";
import DashboardContent from "./DashboardContent";

const DashBoard = () => {
  const context = useContext(AdminContextAuth);
  return context ? <DashboardContent context={context} /> : null;
};

export default DashBoard;
