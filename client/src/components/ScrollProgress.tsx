import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentProgress = window.scrollY;
      const scrollableSpace =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollDegree = (currentProgress * 360) / scrollableSpace;
      setDegree(scrollDegree);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        background: `conic-gradient(#02a94c 0deg ${degree}deg,#263a6379 ${degree}deg 360deg)`,
      }}
      className="cursor-pointer  hover:shadow-[1px_0px_10px_#4bd3a8ca] rounded-full ease-in-out duration-100 md:shadow-[1px_0px_4px_#4bd3a8ca] fixed w-[3.5em] h-[3.5em] md:w-[4em] md:h-[4em]  md:bottom-12 bottom-8 right-8 md:right-20 flex items-center justify-center z-15"
    >
      <div className="md:h-[3.5em] md:w-[3.5em] w-[3em] h-[3em] font-semibold flex items-center justify-center  bg-[#001012] rounded-full">
        <h1 className="text-[#02a94c]">{Math.round((degree * 100) / 360)}</h1>
      </div>
    </div>
  );
};

export default ScrollProgress;
