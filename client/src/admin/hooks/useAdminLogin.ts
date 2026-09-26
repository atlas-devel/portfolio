import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAdminContext } from "../context/AdminContext";

export const useAdminLogin = () => {
  const { baseUrl } = useGlobalContext();
  const { authenticateUser } = useAdminContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const change = (name: "email" | "password", value: string) => setCredentials((prev) => ({ ...prev, [name]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/portfolio/login`, { credentials: "include", method: "post", headers: { "content-type": "application/json" }, body: JSON.stringify(credentials) });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success) { await authenticateUser(); navigate("/auth/secret/admin/dashboard"); return; }
      setError(result?.message || `Login request failed (${response.status}).`);
    } catch (cause) {
      console.error(cause instanceof Error ? cause.message : cause);
      setError("Cannot reach server. Please check backend connection.");
    } finally { setLoading(false); }
  };
  return { credentials, loading, error, change, submit, goHome: () => navigate("/") };
};
