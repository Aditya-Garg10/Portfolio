import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex bg-[#03001C]   items-center justify-center fixed z-[10000]">
      <div className="flex gap-5 font-semibold text-4xl">
        <dotlottie-player
          src="https://lottie.host/c16f0375-842b-4867-99c2-a15cfebeca9c/E8dCpiBxzt.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
};

export default Loader;
