import React, { useContext, useRef } from "react";
import { socialIcons } from "../assets/data";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { MdDone, MdErrorOutline } from "react-icons/md";

const Contacts = () => {
  const { setShowToast, toastInfo, setToastInfo } = useContext(GlobalContext);
  const form = useRef();

  const removeToast = () => {
    setTimeout(() => setShowToast(false), 4000);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
        import.meta.env.VITE_EMAIL_JS_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
      )
      .then(
        (result) => {
          form.current.reset();
          setShowToast(true);
          setToastInfo({
            message: "Message Sent",
            detail: "We'll get back to you soon.",
            color: "#12b782",
            Icon: <MdDone />,
            iconBg: "#3cc59a",
          });
        },
        () => {
          setShowToast(true);
          setToastInfo({
            message: "Error",
            detail: "Message not sent, please try again.",
            color: "#e53935",
            Icon: <MdErrorOutline />,
            iconBg: "#e53935",
          });
        }
      );
  };

  return (
    <section
      id="contacts"
      className="relative w-full my-20 min-h-[80vh] lg:px-16"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, type: "tween" }}
        className="text-4xl font-extrabold text-center text-gray-300 uppercase tracking-wide"
      >
        Contact <span className="text-[#02a94c]">Me</span>
      </motion.h2>
      <hr className="w-36 mx-auto my-4 border-t-2 border-[#02a94c]/60" />

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "tween" }}
        className="w-full lg:w-3/4 mx-auto text-gray-400 text-center text-md"
      >
        I’m always open to new opportunities, collaborations, or just a friendly
        chat about tech. Whether you have a project in mind or want to connect,
        feel free to reach out — I’d love to hear from you!
      </motion.p>

      {/* Content */}
      <div className="my-20">
        <div className="w-full py-4 backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Contact Info */}
            <div className=" w-full lg:w-1/3 bg-[#0b1f1d]/40  rounded-xl p-6 flex flex-col items-center justify-start gap-6">
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src="/avatar.png"
                alt="avatar"
                className="w-60 h-60 rounded-full object-cover"
              />

              {/* Contact Details */}
              <div className="text-[#02a94c] space-y-2 text-center ">
                <div className="flex items-center gap-3 justify-center">
                  <FaPhone />
                  <p>+250 787 723 189</p>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <MdEmail />
                  <p>irakamale@gmail.com</p>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <FaLocationCrosshairs />
                  <p>Kigali, Rwanda</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 text-white text-xl">
                {socialIcons.map(({ icon: Icon, color, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-transform hover:scale-110 shadow-md"
                    style={{ backgroundColor: color }}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full lg:w-2/3 bg-[#0f2d29]/40 border border-[#02a94c]/30 rounded-xl p-8">
              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col gap-6"
              >
                {/* Name fields */}
                <div className="flex flex-col gap-4 mb-4">
                  <input
                    name="user_name"
                    type="text"
                    placeholder="First Name"
                    required
                    className="flex-1 p-3 border border-[#02a94c] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#02a94c]"
                  />
                  <input
                    name="user_lastname"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="flex-1 p-3 border border-[#02a94c] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#02a94c]"
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 border border-[#02a94c] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#02a94c]"
                />

                {/* Message */}
                <textarea
                  name="message"
                  placeholder="Your message..."
                  required
                  rows="6"
                  className="w-full p-3 border border-[#02a94c] bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#02a94c]"
                />

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    onClick={removeToast}
                    type="submit"
                    className="bg-[#02a94c] hover:bg-[#35d195] text-white font-semibold px-6 py-3 rounded-md transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
