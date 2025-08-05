import { useAuth } from "@/context/AuthProvider";
import Image from "next/image";
import React from "react";

const Nav = () => {

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center justify-between w-11/12 md:w-1/2 px-5 py-3 bg-white/10 border-white/10 border-b backdrop-blur-lg rounded-full">
      <div className="flex items-center gap-2">
        <Image
          width={30}
          height={30}
          className="invert"
          src={"/unita.png"}
          alt="Unita Logo"
        />
        <span className="text-primary text-lg font-inter font-semibold">
          Unita
        </span>
      </div>
      <div className="flex items-center gap-5">
        <a href="/survey" className="text-primary hover:text-[#FFF] duration-200 text-sm font-inter">
          Başlayalım!
        </a>
      </div>
    </div>
  );
};

export default Nav;
