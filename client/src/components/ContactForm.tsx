import { ArrowRight, LoaderCircle, Send } from "lucide-react";
import ContactFormFields from "./shared/ContactFormFields";
import { useContactSubmission } from "../hooks/useContactSubmission";

const ContactForm = () => {
  const { formRef, isSending, submit } = useContactSubmission();

  return (
    <div className="rounded-[1.75rem] border border-[#02a94c]/20 bg-gradient-to-br from-[#0a211f]/90 to-[#07191d]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8 lg:col-span-3">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#02a94c]">Send a message</p>
        <h3 className="mt-2 text-2xl font-bold text-white">Tell me what you’re building</h3>
        <p className="mt-2 text-sm leading-6 text-gray-400">Share a few details and I’ll reply as soon as I can.</p>
      </div>
      <form ref={formRef} onSubmit={submit} className="space-y-5">
        <ContactFormFields />
        <button type="submit" disabled={isSending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#02a94c] to-[#02a94c] px-6 py-3 text-sm font-bold text-[#001012] shadow-lg shadow-[#02a94c]/15 transition hover:-translate-y-0.5 hover:shadow-[#02a94c]/30 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
          {isSending ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Sending…</> : <>Send message <Send className="h-4 w-4" /><ArrowRight className="h-4 w-4" /></>}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
