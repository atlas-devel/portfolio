import { motion } from "framer-motion";
import React, { useState, useContext } from "react";
import { AdminContextAuth } from "../context/AdminContext";

interface NewCertificateProps {
  setAddCertificate: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: (title: string) => void;
}

interface CreateCertificateForm {
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageFile: File | null;
}

const NewCertificate: React.FC<NewCertificateProps> = ({
  setAddCertificate,
  onSuccess,
}) => {
  const { baseUrl, getCertificateData } = useContext(AdminContextAuth) || ({} as any);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [createCert, setCreateCert] = useState<CreateCertificateForm>({
    title: "",
    issuer: "",
    date: "",
    description: "",
    imageFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCreateCert((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitCertificate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", createCert.title);
      formData.append("issuer", createCert.issuer);
      formData.append("date", createCert.date);
      formData.append("description", createCert.description);
      if (createCert.imageFile) {
        formData.append("image", createCert.imageFile);
      }

      const res = await fetch(`${baseUrl}/api/certificates/add`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await getCertificateData?.();
        onSuccess?.(createCert.title);
        setAddCertificate(false);
        return;
      }
      setErrorMessage(data?.message || "Failed to upload certificate.");
    } catch (error) {
      console.log(error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="h-screen fixed top-0 right-0 overflow-hidden sm:overflow-auto bg-black/30 backdrop-blur-sm w-full flex items-center justify-center z-50">
      <div>
        <motion.form
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 1 }}
          className="flex h-screen sm:h-[90vh] capitalize flex-col text-white bg-[#1c2532] p-8 sm:rounded-lg w-screen sm:w-[60vw] lg:w-[38vw] space-y-10"
        >
          <div>
            <h1 className="text-center font-bold text-2xl capitalize">
              Add new Certificate
            </h1>
          </div>
          <div className="flex capitalize flex-col space-y-7 overflow-auto custom-scroll">
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2">Title</label>
              <input
                onChange={handleChange}
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                placeholder="Enter Certificate Title"
                type="text"
                name="title"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2">Issuer (e.g. Forward Edge Ltd)</label>
              <input
                onChange={handleChange}
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                placeholder="Enter Issuer"
                type="text"
                name="issuer"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2">Date (e.g. 2024)</label>
              <input
                onChange={handleChange}
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                placeholder="Enter Date"
                type="text"
                name="date"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2">Description</label>
              <textarea
                className="bg-[#2b3544] rounded-md p-4"
                onChange={handleChange}
                name="description"
                placeholder="Describe this Certificate"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2">Certificate File/Image</label>
              <input
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                type="file"
                name="image"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setCreateCert((prev) => ({
                      ...prev,
                      imageFile: e.target.files?.[0] ?? null,
                    }));
                  }
                }}
              />
            </div>
            <div className="flex justify-between mx-4 pt-4">
              {errorMessage && (
                <p className="text-sm text-red-400">{errorMessage}</p>
              )}
            </div>
            <div className="flex justify-between mx-4 pt-1">
              <button
                type="button"
                onClick={() => setAddCertificate(false)}
                className="py-1.5 px-2 md:px-10 rounded-md border border-white/10 bg-gray-600/40 cursor-pointer hover:bg-gray-700 duration-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitCertificate}
                disabled={submitting}
                className="py-1.5 px-2 md:px-6 rounded-md bg-green-600 hover:bg-green-500 cursor-pointer duration-400"
              >
                {submitting ? "Uploading..." : "Submit Certificate"}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default NewCertificate;
