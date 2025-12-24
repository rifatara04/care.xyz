"use client";

import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="w-full h-dvh bg-white flex items-center justify-center absolute top-0 left-0 z-51">
      <figure className="w-80 h-80">
        <Image
          src={"/loading.gif"}
          fill
          className="object-contain relative!"
          alt=""
        />
      </figure>
    </div>
  );
}
