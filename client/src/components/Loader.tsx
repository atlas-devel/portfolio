import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface LoaderProps {
  isLoading: boolean;
  setisLoading: Dispatch<SetStateAction<boolean>>;
}

const Loader = ({ isLoading, setisLoading }: LoaderProps) => {
  const fullText = "welcome to the Atlas portfolio";
  const [displayText, setDisplayText] = useState("");
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    let index = 0;
    let completionTimer = 0;
    const interval = window.setInterval(() => {
      if (index < fullText.length) {
        index++;
        setDisplayText(fullText.slice(0, index));
        setLoadingPercentage((index / fullText.length) * 100);
      } else {
        window.clearInterval(interval);
        completionTimer = window.setTimeout(() => setisLoading(false), 350);
      }
    }, 95);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(completionTimer);
    };
  }, [isLoading, setisLoading]);

  return (
    <main className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#001012] px-5 text-white">
      <section
        role="status"
        aria-live="polite"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#06191a]/70 p-7 sm:p-10"
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
          Atlas portfolio
        </p>
        <h1 className="min-h-10 font-mono text-2xl font-semibold capitalize text-white sm:text-3xl">
          {displayText}
          <span
            aria-hidden="true"
            className="ml-1 animate-pulse text-[#02a94c]"
          >
            |
          </span>
        </h1>
        <div className="mt-8 flex items-center justify-between text-sm text-gray-400">
          <span>{loadingPercentage < 100 ? "Loading..." : "Ready"}</span>
          <span className="tabular-nums">{Math.round(loadingPercentage)}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Portfolio loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(loadingPercentage)}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
        >
          <div
            style={{ width: `${loadingPercentage}%` }}
            className="h-full rounded-full bg-[#02a94c] transition-[width] duration-200 ease-out"
          />
        </div>
      </section>
    </main>
  );
};

export default Loader;
