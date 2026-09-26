import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FiLinkedin } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

// skills icons
import {
  SiTailwindcss,
  SiPython,
  SiExpress,
  SiGo,
  SiNextdotjs,
} from "react-icons/si";
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
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38B2AC" },
  { name: "GitHub", Icon: FaGithub, color: "#ffffff" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Golang", Icon: SiGo, color: "#00ADD8" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "Prisma ORM", Icon: SiPrisma, color: "#0EA5A9" },
];

export const frontEndSkills = [
  { name: "HTML5 & CSS3", rate: 95 },
  { name: "JavaScript", rate: 85 },
  { name: "TypeScript", rate: 80 },
  { name: "React.js", rate: 85 },
  { name: "Next.js", rate: 80 },
  { name: "Tailwind CSS", rate: 85 },
  { name: "Framer Motion", rate: 70 },
  { name: "Responsive Design", rate: 90 },
];

export const BackendSkills = [
  { name: "Node.js", rate: 85 },
  { name: "Express.js", rate: 85 },
  { name: "REST APIs", rate: 85 },
  { name: "Golang (Basic)", rate: 40 },
  { name: "PostgreSQL", rate: 80 },
  { name: "Prisma", rate: 75 },
];

export const toolsAndTech = [
  { name: "TanStack Query", rate: 80 },
  { name: "REST APIs", rate: 90 },
  { name: "Git & GitHub", rate: 90 },
  { name: "Responsive Design", rate: 95 },
  { name: "Figma (Basic)", rate: 60 },
];

export interface WorkExperience {
  role: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
}

export const workExperience: WorkExperience[] = [
  {
    role: "Technical Fellow",
    organization: "Rwanda ICT Chamber",
    location: "Kigali, Rwanda",
    period: "2026",
    highlights: [
      "Participate in a practical technology fellowship focused on applying technical knowledge in real-world environments.",
      "Support technology-focused activities and initiatives while working with different stakeholders.",
      "Strengthen communication, practical problem-solving, and the ability to apply IT knowledge beyond the classroom.",
    ],
  },
  {
    role: "Frontend Developer Team Lead Intern",
    organization: "Infinity Innovation",
    location: "Remote",
    period: "June 2026 – Present",
    highlights: [
      "Lead frontend work across the intern team and coordinate project tasks.",
      "Build responsive interfaces and reusable components with Next.js, React, and Tailwind CSS.",
      "Review code and help the team follow consistent frontend standards.",
    ],
  },
  {
    role: "Co-Founder & CTO",
    organization: "9call",
    location: "Kigali, Rwanda",
    period: "January 2026 – Present",
    highlights: [
      "Contribute primarily to frontend development across company projects.",
      "Build responsive interfaces and connect applications to backend APIs.",
      "Help shape the technical direction and plan features with the team.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    organization: "Mastery Hub Rwanda",
    location: "Kigali, Rwanda",
    period: "April 2026 – June 2026",
    highlights: [
      "Worked with other interns to redesign Bobo250, an electronics e-commerce platform.",
      "Improved product browsing and contributed to the payment submission flow.",
      "Helped test, refine, and deliver the updated platform to the company.",
    ],
  },
];

export const education = [
  {
    institution: "RP College of Kigali",
    location: "Kigali City, Rwanda",
    qualification: "Advanced Diploma in Information Technology",
    period: "2024 – Present · Final Year",
    detail: "Currently completing the final year of the program.",
  },
  {
    institution: "World Mission High School",
    location: "Kigali City, Rwanda",
    qualification: "A2 Certificate",
    period: "2021 – 2023",
    detail:
      "Finished in the top 3 of the class and served as Class Monitor for two years.",
  },
];

export const recognitions = [
  {
    title: "Top 3 Project",
    detail: "KOICA Arduino Training Program · Cohort 1",
  },
  {
    title: "Top 5 Project",
    detail: "KOICA Arduino Training Program · Cohort 2",
  },
];

export const languages = [
  { name: "English", level: "Proficient" },
  { name: "Kinyarwanda", level: "Native" },
];

// navigations Nav Componets
export const navbar = [
  { name: "Home", link: "home" },
  { name: "About", link: "about" },
  { name: "Skills", link: "skills" },
  { name: "Experience", link: "experience" },
  { name: "Background", link: "background" },
  { name: "Projects", link: "projects" },
  { name: "Contact", link: "contacts" },
];
