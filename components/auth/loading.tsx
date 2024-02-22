import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={700}
        height={700}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default Loading;
