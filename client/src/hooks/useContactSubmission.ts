import { createElement, FormEvent, useRef, useState } from "react";
import { MdDone, MdErrorOutline } from "react-icons/md";
import { useGlobalContext } from "../context/GlobalContext";

export const useContactSubmission = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const { baseUrl, setShowToast, setToastInfo } = useGlobalContext();

  const report = (success: boolean, detail: string) => {
    setToastInfo({ message: success ? "Message sent" : "Message not sent", detail, color: success ? "#12b782" : "#e53935", Icon: createElement(success ? MdDone : MdErrorOutline), iconBg: success ? "#3cc59a" : "#e53935" });
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 5000);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current || isSending) return;
    setIsSending(true);
    try {
      const values = Object.fromEntries(new FormData(formRef.current).entries());
      const response = await fetch(`${baseUrl}/api/contact/send`, {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || `Request failed (${response.status}).`);
      formRef.current.reset();
      report(true, "Thanks for reaching out. I’ll get back to you soon.");
    } catch (error) {
      console.error("Contact form submission failed", error);
      report(false, error instanceof Error ? error.message : "Please try again or contact me directly.");
    } finally { setIsSending(false); }
  };

  return { formRef, isSending, submit };
};
