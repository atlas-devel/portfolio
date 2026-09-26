import { FaLocationCrosshairs, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { socialIcons } from "../assets/data";
import ContactMethod from "./shared/ContactMethod";
import SocialLinks from "./shared/SocialLinks";

const contactLinks = [
  {
    label: "Phone",
    value: "+250 787 723 189",
    href: "tel:+250787723189",
    icon: FaPhone,
  },
  {
    label: "Email",
    value: "irakamale@gmail.com",
    href: "mailto:irakamale@gmail.com",
    icon: MdEmail,
  },
];

const ContactInfoCard = () => (
  <aside className="flex flex-col rounded-[1.75rem] border border-[#02a94c]/20 bg-gradient-to-b from-[#0b2421]/90 to-[#061415]/90 p-6 sm:p-8 lg:col-span-2">
    <div className="relative mx-auto mb-6 h-36 w-36 sm:h-44 sm:w-44">
      <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#02a94c]/50 to-cyan-400/20 blur-lg" />
      <img
        src="/leon.jpeg"
        alt="Leon Irakara"
        className="relative h-full w-full rounded-full border-2 border-[#02a94c]/50 object-cover object-top"
      />
    </div>
    <h3 className="text-center text-xl font-bold text-white">Let’s connect</h3>
    <p className="mt-2 text-center text-sm leading-6 text-gray-400">
      Based in Kigali and open to meaningful projects, collaborations, and
      conversations.
    </p>

    <div className="mt-7 space-y-3">
      {contactLinks.map((contact) => (
        <ContactMethod key={contact.label} {...contact} />
      ))}
      <ContactMethod
        label="Location"
        value="Kigali, Rwanda"
        icon={FaLocationCrosshairs}
      />
    </div>

    <SocialLinks items={socialIcons} />
  </aside>
);

export default ContactInfoCard;
