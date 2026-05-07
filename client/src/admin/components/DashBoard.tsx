import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Edit3,
  Filter,
  Search,
  Eye,
  Code,
  Globe,
  Github,
  ExternalLink,
  LogOut,
  Calendar,
  Tag,
  Trash,
  Phone,
  Award,
} from "lucide-react";
import NewProject from "./NewProject";
import NewCertificate from "./NewCertificate";
import { AdminContextAuth } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import UpdateProject from "./UpdateProject";
import { IProject } from "../../context/GlobalContext";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardPopup {
  title: string;
  detail: string;
  time: string;
}

type ProjectStatus = "dev" | "live" | "dep-local";

const resolveProjectStatus = (item: Pick<IProject, "status" | "isLive">): ProjectStatus => {
  if (item?.status === "live" || item?.status === "dep-local" || item?.status === "dev") {
    return item.status;
  }
  return item?.isLive ? "live" : "dev";
};

const formatProjectDate = (createdAt?: string): string => {
  if (!createdAt) return "Date unavailable";
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";
  return parsed.toDateString();
};

const DashBoard = () => {
  const [addProject, setaddProject] = useState(false);
  const [addCertificate, setAddCertificate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [showUpdate, setshowUpdate] = useState(false);
  const [dashboardPopup, setDashboardPopup] = useState<DashboardPopup | null>(
    null,
  );
  const adminContext = useContext(AdminContextAuth);
  if (!adminContext) return null;
  const {
    userData,
    baseUrl,
    projects,
    certificates,
    deleteProject,
    getProjectData,
    getCertificateData,
    visitorStats,
    getVisitorStats,
  } = adminContext;
  const navigate = useNavigate();

  useEffect(() => {
    getProjectData();
    getCertificateData();
    getVisitorStats();
  }, []);

  useEffect(() => {
    if (!dashboardPopup) return;
    const timeout = setTimeout(() => {
      setDashboardPopup(null);
    }, 3200);

    return () => clearTimeout(timeout);
  }, [dashboardPopup]);

  const showAddedPopup = (type: "project" | "certificate", name: string) => {
    const itemName = name?.trim() || (type === "project" ? "Untitled project" : "Untitled certificate");
    const locationLabel = type === "project" ? "Projects" : "Certificates";
    setDashboardPopup({
      title:
        type === "project"
          ? "New project added"
          : "New certificate added",
      detail:
        type === "project"
          ? `Project "${itemName}" was added to ${locationLabel}.`
          : `Certificate "${itemName}" was added to ${locationLabel}.`,
      time: new Date().toLocaleTimeString(),
    });
  };

  // logging out api

  const makeLogout = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/portfolio/logout`, {
        method: "post",
        credentials: "include",
      });
      const info = await res.json();
      if (info.success) {
        navigate("/auth/secret/admin-login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nameParts = userData?.fullName?.trim()?.split(/\s+/) || [];
  const nameInitials = nameParts.length
    ? `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase()
    : "AD";
  const lastName = nameParts.length ? nameParts[nameParts.length - 1] : "Admin";
  const handleLogout = () => {
    setShowProfile((prev) => !prev);
  };

  const totalProjectsCount = projects?.length || 0;
  const liveProjectsCount =
    projects?.filter((item) => resolveProjectStatus(item) === "live").length || 0;
  const localProjectsCount =
    projects?.filter((item) => resolveProjectStatus(item) === "dep-local").length || 0;
  const devProjectsCount =
    projects?.filter((item) => resolveProjectStatus(item) === "dev").length || 0;
  const uniqueTechStacksCount = new Set(
    (projects || []).flatMap((item) => item.techs || []),
  ).size;
  const totalCertificatesCount = certificates?.length || 0;
  const certificatesWithFilesCount =
    certificates?.filter((item) => Boolean(item.imageUrl)).length || 0;

  const statsChartData = useMemo(
    () => [
      { metric: "Projects", value: totalProjectsCount },
      { metric: "In Dev", value: devProjectsCount },
      { metric: "Live", value: liveProjectsCount },
      { metric: "Dep-Local", value: localProjectsCount },
      { metric: "Tech", value: uniqueTechStacksCount },
      { metric: "Certs", value: totalCertificatesCount },
      { metric: "Cert Files", value: certificatesWithFilesCount },
      { metric: "Visitors", value: visitorStats.totalVisitors },
      { metric: "Today", value: visitorStats.todayVisitors },
    ],
    [
      totalProjectsCount,
      devProjectsCount,
      liveProjectsCount,
      localProjectsCount,
      uniqueTechStacksCount,
      totalCertificatesCount,
      certificatesWithFilesCount,
      visitorStats.totalVisitors,
      visitorStats.todayVisitors,
    ],
  );

  const visitorTrendData = useMemo(
    () =>
      visitorStats.last7Days.map((day) => ({
        day: new Date(day.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        visitors: day.count,
      })),
    [visitorStats.last7Days],
  );

  return (
    <section className="relative min-h-screen w-screen">
      {dashboardPopup && (
        <div className="fixed right-4 top-4 z-[80] w-[92vw] max-w-md rounded-md border border-green-500/30 bg-[#0d1f18] p-4 text-white shadow-lg">
          <h2 className="text-base font-semibold text-green-400">
            {dashboardPopup.title}
          </h2>
          <p className="mt-1 text-sm text-gray-200">{dashboardPopup.detail}</p>
          <p className="mt-2 text-xs text-green-200/80">Saved at {dashboardPopup.time}</p>
        </div>
      )}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <nav className="relative text-white flex items-center justify-between pt pb-3 py-10 border-b border-green-400/40">
          <div className=" flex flex-col items-center gap-2 ">
            <span
              onClick={handleLogout}
              className="cursor-pointer rounded-full p-1  bg-green-600/20 border border-green-500 h-12 w-12 flex items-center justify-center "
            >
              <h1 className=" text-white font-semibold text-xl ">
                {nameInitials}
              </h1>{" "}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setAddCertificate(true)}
              className="flex items-center border-none outile-none hover:bg-green-500 cursor-pointer duration-400 bg-[#0a7a3b] rounded-lg gap-2 px-4 py-3 md:py-1.5"
            >
              <Award className="w-5 h-5" />
              <h1 className="hidden sm:block"> Add a certificate</h1>
            </button>

            <button
              onClick={() => setaddProject(true)}
              className="flex items-center border-none outile-none hover:bg-green-500 cursor-pointer duration-400 bg-[#02a94c] rounded-lg gap-2 px-4 py-3 md:py-1.5"
            >
              <Plus className="w-5 h-5" />
              <h1 className="hidden sm:block"> Add a project</h1>
            </button>
          </div>

          {showProfile && (
            <div
              onMouseLeave={handleLogout}
              className=" w-full sm:w-auto left-0 absolute  flex flex-col gap-2 text-sm xl:text-md text-gray-300 top-24 z-10 bg-[#001012] rounded-md p-4 py-5 border-2 border-green-500/30 "
            >
              <div>
                <div className="flex font-semibold  gap-2 items-center border-b border-green-500/40 pb-3">
                  <span className=" rounded-full p-1  bg-green-600/20 border border-green-500 h-10 w-10 flex items-center justify-center ">
                    <h1 className=" text-white text-xl ">
                      {nameInitials}
                    </h1>{" "}
                  </span>
                  <div className="">
                    <p className="">{userData?.email}</p>
                    <p className="">{lastName}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 pt-2">
                <Phone className="w-4" />
                <p className="">{userData?.phone_number}</p>
              </div>

              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <LogOut className="w-4" />
                <p
                  onClick={makeLogout}
                  className="text-md cursor-pointer hover:text-green-500"
                >
                  Logout
                </p>
              </div>
              {userData?.phone_number && (
                <p
                  onClick={() => navigate("/")}
                  className="uppercase cursor-pointer hover:text-green-500 text-center font-light"
                >
                  portfolio
                </p>
              )}
            </div>
          )}
        </nav>
        {/* project options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 w-fit p-4 rounded-lg">
                <Code />
              </div>
              <div>
                <p className="font-sm text-gray-400">Total Projects</p>
                <h1 className="font-bold text-xl">{totalProjectsCount}</h1>
              </div>
            </div>
          </div>
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 w-fit p-4 rounded-lg">
                <Edit3 />
              </div>
              <div>
                <p className="font-sm text-gray-400">In development</p>
                <h1 className="font-bold text-xl">{devProjectsCount}</h1>
              </div>
            </div>
          </div>
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 w-fit p-4 rounded-lg">
                <Globe />
              </div>
              <div>
                <p className="font-sm text-gray-400">Live projects</p>
                <h1 className="font-bold text-xl">{liveProjectsCount}</h1>
              </div>
            </div>
          </div>
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 w-fit p-4 rounded-lg">
                <Globe />
              </div>
              <div>
                <p className="font-sm text-gray-400">Dep-local projects</p>
                <h1 className="font-bold text-xl">{localProjectsCount}</h1>
              </div>
            </div>
          </div>
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-violet-500 w-fit p-4 rounded-lg">
                <Tag />
              </div>
              <div>
                <p className="font-sm text-gray-400">Tech stacks</p>
                <h1 className="font-bold text-xl">{uniqueTechStacksCount}</h1>
              </div>
            </div>
          </div>
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 w-fit p-4 rounded-lg">
                <Award />
              </div>
              <div>
                <p className="font-sm text-gray-400">Total certificates</p>
                <h1 className="font-bold text-xl">{totalCertificatesCount}</h1>
              </div>
            </div>
          </div>
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-teal-500 w-fit p-4 rounded-lg">
                <Tag />
              </div>
              <div>
                <p className="font-sm text-gray-400">Certificates with file</p>
                <h1 className="font-bold text-xl">
                  {certificatesWithFilesCount}
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-500 w-fit p-4 rounded-lg">
                <Eye />
              </div>
              <div>
                <p className="font-sm text-gray-400">Portfolio visitors</p>
                <h1 className="font-bold text-xl">{visitorStats.totalVisitors}</h1>
                <p className="text-xs text-cyan-200 mt-1">
                  {visitorStats.todayVisitors} today
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-md border border-white/20 bg-green-900/20 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Dashboard stats analytics
            </h2>
            <span className="text-xs text-gray-300">
              Metrics from all stat cards
            </span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statsChartData}
                margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f4934" />
                <XAxis dataKey="metric" stroke="#b8c7bd" fontSize={12} />
                <YAxis stroke="#b8c7bd" allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
                  contentStyle={{
                    background: "#062e20",
                    border: "1px solid #1c6b4a",
                    borderRadius: "8px",
                    color: "#d1fae5",
                  }}
                />
                <Bar dataKey="value" fill="#02a94c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-8 rounded-md border border-white/20 bg-green-900/20 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Visitor trend (last 7 days)
            </h2>
            <span className="text-xs text-gray-300">Unique daily visitors</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visitorTrendData}
                margin={{ top: 8, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f4934" />
                <XAxis dataKey="day" stroke="#b8c7bd" fontSize={12} />
                <YAxis stroke="#b8c7bd" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "#062e20",
                    border: "1px solid #1c6b4a",
                    borderRadius: "8px",
                    color: "#d1fae5",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#22d3ee" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          {/* search  and filter*/}
          <div className="flex flex-col sm:flex-row  justify-between items-center my-15">
            <div className="flex-1 w-full sm:max-w-[43vw] relative border-green-500/30 shadow-inner h-12 py-0.5 border   rounded-md bg-green-900/15 backdrop-blur-sm">
              <Search className="absolute top-2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Seach Projects..."
                className="w-full h-full  text-white py-2 sm:py-0 pl-12 border-none outline-none"
              />
            </div>
            <div className="self-end mt-5 sm:mt-0 sm:self-auto flex items-center gap-2 ml-12">
              <Filter className=" text-gray-300" />
              <div>
                <div className=" border-green-500/30 shadow-inner h-10 py-0.5 border inline-block  rounded-md bg-green-900/15 backdrop-blur-sm">
                  <select
                
                    className="w-full h-full  text-white pl-4 border-none outline-none bg-green-800/15 capitalize"
                  >
                    <option
                      className="bg-green-950/90 p-2 text-sm sm:text-lg "
                      value="all"
                    >
                      All
                    </option>
                    <option className="bg-green-950/90 p-2 " value="react">
                      react
                    </option>
                    <option
                      className="bg-green-950/90 p-2 "
                      value="react-native"
                    >
                      react-native
                    </option>
                    <option className="bg-green-950/90 p-2 " value="next js">
                      next js
                    </option>
                    <option className="bg-green-950/90 p-2 " value="node js">
                      node js
                    </option>
                    <option className="bg-green-950/90 p-2 " value="mongo db">
                      mongo db
                    </option>
                    <option className="bg-green-950/90 p-2 " value="python">
                      python
                    </option>
                    <option className="bg-green-950/90 p-2 " value="php">
                      php
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/*  projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-4 ">
            {projects?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="bg-gray-800/50 text-white backdrop-blur-sm rounded-md border border-white/20 overflow-hidden "
                >
                  <div className="relative w-full bg-gradient-to-bl from-white/20 to-0 h-60 ">
                    {resolveProjectStatus(item) === "live" && (
                      <p className="absolute  z-10 top-0 right-0 m-2 text-sm text-green-400  bg-green-500/20 inline-block px-2 rounded-full border border-green-400/50">
                        Live
                      </p>
                    )}
                    {resolveProjectStatus(item) === "dev" && (
                      <p className="absolute z-10 top-0 right-0 m-2 text-sm text-orange-400 bg-[#ff6900]/20 inline-block px-2 rounded-full border border-orange-500/50">
                        Dev
                      </p>
                    )}
                    {resolveProjectStatus(item) === "dep-local" && (
                      <p className="absolute z-10 top-0 right-0 m-2 text-sm text-indigo-300 bg-indigo-500/20 inline-block px-2 rounded-full border border-indigo-400/50">
                        Dep-Local
                      </p>
                    )}
                    {item.imageFile ? (
                      <img
                        src={`${item.imageFile}`}
                        alt=""
                        className="object-cover w-full h-full brightness-75 duration-400 ease-in-out cursor-pointer hover:brightness-95"
                      />
                    ) : (
                      <div className=" text-gray-400  flex items-center h-full w-full">
                        <Code className=" m-auto h-15 w-20" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h1 className="font-bold text-xl">{item.projectName}</h1>
                    <p className="text-sm text-gray-400 fonr-semibold my-3">
                      {item.description}
                    </p>
                    <div className="flex gap-3 mt-3">
                      {item.techs.map((tech, index) => {
                        return (
                          <span
                            key={index * 20}
                            className="rounded-md text-gray-300 text-sm bg-gray-600/30 backdrop-blur-md border border-white/20 px-2 py-0.5"
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center text-gray-400 text-sm ">
                        <span className="inline-block pr-3 ">
                          <Calendar className="w-5 " />
                        </span>
                        <span className="inline-block">
                          {formatProjectDate(item.createdAt)}
                        </span>
                      </div>
                      <div className="flex gap-6   p-2">
                        <span className="cursor-pointer">
                          <ExternalLink className="w-4 text-gray-400 hover:text-gray-100 ease-in-out hover:w-5 duration-400" />
                        </span>
                        <span className="cursor-pointer">
                          <Github className="w-4 text-gray-400 hover:text-gray-100 ease-in-out hover:w-5 duration-400" />
                        </span>
                        <span
                          onClick={() => {
                            setProjectId(item._id);
                            setshowUpdate(true);
                          }}
                          className="cursor-pointer"
                        >
                          <Edit3 className="w-4 text-gray-400 hover:text-gray-100 ease-in-out hover:w-5 duration-400" />
                        </span>
                        <span
                          onClick={() => deleteProject(item._id)}
                          className="cursor-pointer"
                        >
                          <Trash className="w-4 text-gray-400 hover:text-gray-100 ease-in-out hover:w-5 duration-400" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {addProject && (
        <section className="absolute top-0  left-0 min-h-screen w-full z-50">
          <NewProject
            setaddProject={setaddProject}
            onSuccess={(projectName) => showAddedPopup("project", projectName)}
          />
        </section>
      )}
      {addCertificate && (
        <section className="absolute top-0 left-0 min-h-screen w-full z-50">
          <NewCertificate
            setAddCertificate={setAddCertificate}
            onSuccess={(title) => showAddedPopup("certificate", title)}
          />
        </section>
      )}
      {showUpdate && projectId && (
        <UpdateProject setshowUpdate={setshowUpdate} projectId={projectId} />
      )}
    </section>
  );
};

export default DashBoard;
