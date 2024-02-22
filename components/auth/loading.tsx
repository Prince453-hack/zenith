import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={60}
        height={60}
        className="animate-spin duration-700"
      />
    </div>
  );
};

export default Loading;
