import { FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";

interface AdminFormModalProps {
  title: string;
  children: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
  titleClassName?: string;
}

const AdminFormModal = ({ title, children, onSubmit, className, titleClassName }: AdminFormModalProps) => (
  <section className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black/30 p-0 backdrop-blur-sm">
    <motion.form initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} onSubmit={onSubmit} className={className ?? "flex max-h-[90vh] w-full max-w-2xl flex-col gap-8 overflow-y-auto rounded-xl border border-[#2b3544] bg-[#1c2532]/95 p-8 text-white shadow-2xl sm:p-12"}>
      <h1 className={titleClassName ?? "text-center text-2xl font-bold capitalize"}>{title}</h1>
      {children}
    </motion.form>
  </section>
);

export default AdminFormModal;
