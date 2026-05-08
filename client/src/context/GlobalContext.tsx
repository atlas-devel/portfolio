import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

export interface IProject {
  _id: string;
  projectName: string;
  description: string;
  techs: string[];
  githubLink: string;
  liveLink?: string;
  imageFile?: string;
  status?: "dev" | "live" | "dep-local";
  isLive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IToastInfo {
  message?: string;
  type?: "success" | "error" | "info" | "";
  [key: string]: any;
}

export interface ICertificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl?: string;
}

export interface IGlobalContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  toastInfo: IToastInfo;
  setToastInfo: React.Dispatch<React.SetStateAction<IToastInfo>>;
  allProjects: IProject[];
  setAllProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  allCertificates: ICertificate[];
  setAllCertificates: React.Dispatch<React.SetStateAction<ICertificate[]>>;
  baseUrl: string;
  getProjectData: () => Promise<void>;
  getCertificateData: () => Promise<void>;
  lastScrollY: React.MutableRefObject<number>;
}

export const GlobalContext = createContext<IGlobalContext | undefined>(
  undefined,
);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState<IToastInfo>({});
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const [allCertificates, setAllCertificates] = useState<ICertificate[]>([]);

  const [baseUrl] = useState<string>(import.meta.env.VITE_BACKEND_URL || "");

  const getProjectData = async () => {
    if (!baseUrl) return;
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
        // Ensure projects are displayed newest-first.
        const projects = Array.isArray(data.projects) ? data.projects.slice() : [];
        const getTimestamp = (p: any) => {
          if (p?.createdAt) {
            const t = Date.parse(p.createdAt);
            if (!Number.isNaN(t)) return t;
          }
          // Fallback: derive timestamp from Mongo ObjectId if available
          if (p?._id && typeof p._id === "string" && p._id.length >= 8) {
            try {
              return parseInt(p._id.substring(0, 8), 16) * 1000;
            } catch (e) {
              return 0;
            }
          }
          return 0;
        };

        projects.sort((a: any, b: any) => getTimestamp(b) - getTimestamp(a));
        setAllProjects(projects);
      }
    } catch (err) {
      console.error("failed to fetchprojects: " + err);
    }
  };

  const getCertificateData = async () => {
    if (!baseUrl) return;
    try {
      const res = await fetch(`${baseUrl}/api/certificates/all`, {
        method: "get",
        headers: { "content-type": "application/json" },
      });
      if (!res.ok) throw new Error("failed to connect DB");
      const data = await res.json();
      if (data.success) setAllCertificates(data.certificates);
    } catch (err) {
      console.error("failed to fetch certificates: " + err);
    }
  };

  const recordVisit = async () => {
    if (!baseUrl) return;
    if (window.location.pathname !== "/") return;

    const todayKey = new Date().toISOString().slice(0, 10);
    const storageKey = `portfolio_visit_recorded_${todayKey}`;

    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/analytics/record-visit`, {
        method: "post",
      });

      if (res.ok) {
        sessionStorage.setItem(storageKey, "1");
      }
    } catch (error) {
      console.error("failed to record visit: " + error);
    }
  };

  useEffect(() => {
    getProjectData();
    getCertificateData();
    recordVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  const lastScrollY = useRef<number>(0);

  const navAppearance = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY.current) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }

    lastScrollY.current = currentScroll;
  };

  useEffect(() => {
    window.addEventListener("scroll", navAppearance);
    return () => window.removeEventListener("scroll", navAppearance);
  }, []);

  const contextData: IGlobalContext = {
    isOpen,
    lastScrollY,
    setIsOpen,
    showMenu,
    setShowMenu,
    showToast,
    setShowToast,
    toastInfo,
    setToastInfo,
    allProjects,
    setAllProjects,
    allCertificates,
    setAllCertificates,
    baseUrl,
    getProjectData,
    getCertificateData,
  };

  return (
    <GlobalContext.Provider value={contextData}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
