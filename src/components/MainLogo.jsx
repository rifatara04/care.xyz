import Image from "next/image";

export default function MainLogoComponent() {
  return (
    <span className="flex items-center gap-2.5">
      <figure className="w-12 h-12">
        <Image src={"/logo.png"} fill alt="" className="relative!" />
      </figure>
      <span className="text-2xl font-extrabold">
        Care.<span className="text-primary">xyz</span>
      </span>
    </span>
  );
}
