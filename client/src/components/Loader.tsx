import React, { useEffect, useState } from "react";

const Loader = ({ isLoading, setisLoading }) => {
  const fullText = "welcome to my portfolio";
  const [displayText, setDisplayText] = useState("");
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        setLoadingPercentage(((index + 1) * 100) / fullText.length);
        index++;
      } else {
        clearInterval(interval);
      }
      if (index === fullText.length) {
        setTimeout(() => setisLoading(false), 300);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div>
        <h1 className="text-[#02a94c] transition-all text-center font-mono capitalize text-2xl md:text-3xl mb-4">
          {displayText} {loadingPercentage < 100 ? <span>|</span> : null}
        </h1>
        <div className="max-w-[20em] mx-3 sm:mx-auto sm:w-[20em] m-auto h-2 rounded-full border border-[#02a94c]">
          <div
            style={{ width: `${loadingPercentage}%` }}
            className="h-full bg-gradient-to-r from-0 to-[#02a94c] transition-all ease-in-out duration-200 rounded-r-full"
          ></div>
          <p className="text-center text-gray-400 font-mono mt-4">
            {loadingPercentage < 100 ? "Initialising..." : "ready"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
