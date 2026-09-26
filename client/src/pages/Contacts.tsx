import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import ContactForm from "../components/ContactForm";
import ContactInfoCard from "../components/ContactInfoCard";
import SectionTitle from "../components/SectionTitle";

const Contacts = () => (
  <section id="contacts" className="relative scroll-mt-24 py-16 md:py-24">
    <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-[#02a94c]/[0.07] blur-[100px]" />
    <SectionTitle
      title="Let's"
      accent="talk"
      eyebrow="Open to conversations"
      icon={<Mail className="h-4 w-4" />}
      description="I'm open to opportunities, collaborations, and good conversations about technology. Tell me what is on your mind."
      className="mb-12"
    />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45 }}
      className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-5"
    >
      <ContactInfoCard />
      <ContactForm />
    </motion.div>
  </section>
);

export default Contacts;
