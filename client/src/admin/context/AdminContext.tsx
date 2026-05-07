import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ICertificate, IProject } from "../../context/GlobalContext";

export interface IUserData {
  email?: string;
  fullName?: string;
  dev_name?: string;
  phone_number?: string;
  [key: string]: any;
}

export interface IAdminContextAuth {
  userData: IUserData | null;
  isloggedin: boolean;
  baseUrl: string;
  authenticateUser: () => Promise<void>;
  projects: IProject[] | null;
  setProjects: React.Dispatch<React.SetStateAction<IProject[] | null>>;
  getProjectData: () => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  certificates: ICertificate[];
  getCertificateData: () => Promise<void>;
  visitorStats: IVisitorStats;
  getVisitorStats: () => Promise<void>;
}

export interface IVisitorStatItem {
  date: string;
  count: number;
}

export interface IVisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  last7Days: IVisitorStatItem[];
}

export const AdminContextAuth = createContext<IAdminContextAuth | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isloggedin, setIsloggedin] = useState(false);
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [baseUrl] = useState<string>(import.meta.env.VITE_BACKEND_URL || "");

  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [visitorStats, setVisitorStats] = useState<IVisitorStats>({
    totalVisitors: 0,
    todayVisitors: 0,
    last7Days: [],
  });

  const authenticateUser = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/portfolio/user`, {
        method: "get",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("unauthorized");
      }

      const data = await res.json();
      if (data.success) {
        setUserData(data);
        setIsloggedin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectData = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/projects/all-projects`, {
        method: "get",
        headers: { "content-type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("failed to connect DB");
      }
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("failed to fetchprojects: " + err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/projects/remove/${id}`, {
        method: "delete",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("failed to connect to server");
      }
      const data = await res.json();
      if (data.success) {
        await getProjectData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getVisitorStats = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/analytics/visitor-stats`, {
        method: "get",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("failed to fetch visitor stats");
      }

      const data = await res.json();
      if (data.success && data.stats) {
        setVisitorStats(data.stats);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCertificateData = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/certificates/all`, {
        method: "get",
        headers: { "content-type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("failed to fetch certificate data");
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.certificates)) {
        setCertificates(data.certificates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const data: IAdminContextAuth = {
    userData,
    isloggedin,
    baseUrl,
    authenticateUser,
    projects,
    setProjects,
    getProjectData,
    deleteProject,
    certificates,
    getCertificateData,
    visitorStats,
    getVisitorStats,
  };

  return (
    <AdminContextAuth.Provider value={data}>
      {children}
    </AdminContextAuth.Provider>
  );
};
