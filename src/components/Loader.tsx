import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="grid place-items-center py-20 -z-30">
      <Image
        src={"/Loader.png"}
        width={100}
        height={100}
        alt="Loader"
        priority={true}
        className="max-w-[60px] object-fill animate-spin z-50 place-self-center"
      ></Image>
    </div>
  );
}
