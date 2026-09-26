import { FormEvent } from "react";
import { AiOutlineLogin } from "react-icons/ai";

interface LoginPanelProps {
  credentials: { email: string; password: string };
  loading: boolean;
  error: string;
  onChange: (name: "email" | "password", value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onHome: () => void;
}

const LoginPanel = ({ credentials, loading, error, onChange, onSubmit, onHome }: LoginPanelProps) => (
  <main className="flex min-h-screen items-center justify-center text-gray-200">
    <form onSubmit={onSubmit} className="w-[90%] rounded-lg border border-[#02a94c]/30 bg-green-500/2 p-8 sm:w-[30em]">
      <header className="mb-5 flex items-center justify-center gap-1 text-center">
        <span className="bg-gradient-to-b from-white/10 to-[#02a94c] bg-clip-text text-4xl text-transparent"><AiOutlineLogin /></span>
        <h1 className="bg-gradient-to-b from-white/10 to-green-500 bg-clip-text text-4xl font-bold uppercase text-transparent">Login</h1>
      </header>
      <div className="mb-3 flex flex-col gap-4">
        {(["email", "password"] as const).map((field) => <label key={field} className="flex flex-col gap-3 font-semibold capitalize text-gray-300">{field}
          <span className="rounded-full px-4 py-2.5 shadow-[inset_0px_0px_4px_#02a94c]"><input required value={credentials[field]} onChange={(event) => onChange(field, event.target.value)} className="w-full bg-transparent text-white outline-none" type={field} placeholder={field === "email" ? "email" : "Password"} /></span>
        </label>)}
        <button type="submit" disabled={loading} className="my-4 rounded-full border border-green-800 bg-gradient-to-b from-0 to-green-500/40 py-2 font-bold capitalize text-gray-200">{loading ? "Signing in..." : "Sign in"}</button>
        {error && <p role="alert" className="text-center text-sm text-red-400">{error}</p>}
        <p className="text-center capitalize">Forgot a password? <span className="cursor-pointer text-green-600 underline">Click here</span></p>
        <button type="button" onClick={onHome} className="text-center text-sm text-gray-400 duration-300 hover:text-green-600 hover:underline">Return Home</button>
      </div>
    </form>
  </main>
);

export default LoginPanel;
