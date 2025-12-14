import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FiLinkedin } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

// skills icons
import { SiTailwindcss, SiPython, SiExpress, SiMongodb } from "react-icons/si";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiPrisma } from "react-icons/si";

export const socialIcons = [
  {
    id: 1,
    icon: FaGithub,
    color: "#181717",
    link: "https://github.com/vicious-franco",
  },
  {
    id: 2,
    icon: FaInstagram,
    color: "#E1306C",
    link: "https://www.instagram.com/_____leon_____________?igsh=MWRmZWYyZTY0anYydQ== ",
  },
  {
    id: 3,
    icon: FaWhatsapp,
    color: "#25D366",
    link: "https://wa.me/250787723139",
  },
  {
    id: 4,
    icon: BiLogoGmail,
    color: "#D14836",
    link: "mailto:irakaramale@gmail.com",
  },
  {
    id: 5,
    icon: FiLinkedin,
    color: "#0A66C2",
    link: "https://www.linkedin.com/in/irakarama-jean-francois-leon-070831278",
  },
];

export const skillIcons = [
  { name: "React", Icon: FaReact, color: "#61DAFB" },
  { name: "HTML5", Icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", Icon: FaJs, color: "#F7DF1E" },
  { name: "Node.js", Icon: FaNodeJs, color: "#339933" },
  { name: "Express.js", Icon: SiExpress, color: "#d1d5db" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38B2AC" },
  { name: "GitHub", Icon: FaGithub, color: "#ffffff" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "Prisma ORM", Icon: SiPrisma, color: "#0EA5A9" },
];

export const frontEndSkills = [
  { name: "HTML", rate: 97 },
  { name: "CSS", rate: 70 },
  { name: "Tailwind CSS", rate: 75 },
  { name: "JavaScript", rate: 75 },
  { name: "React.js", rate: 70 },
  { name: "TypeScript", rate: 40 },
];

export const BackendSkills = [
  { name: "Node.js", rate: 78 },
  { name: "Express.js", rate: 80 },
  { name: "MongoDB", rate: 75 },
  { name: "PostgreSQL", rate: 75 },
  { name: "Prisma ORM", rate: 70 },
  { name: "Python", rate: 35 },
];

export const toolsAndTech = [
  { name: "Git & GitHub", rate: 80 },
  { name: "VS Code", rate: 90 },
  { name: "Postman", rate: 75 },
  { name: "Cloudinary", rate: 70 },
  { name: "Multer", rate: 65 },
  { name: "Socket.io", rate: 50 },
];

// navigations Nav Componets
export const navbar = [
  { name: "Home", link: "home" },
  { name: "About", link: "about" },
  { name: "Skills", link: "skills" },
  { name: "Background", link: "background" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contacts" },
];
