"use client";

import { container, largeBtnPrimary } from "@/utils/classNames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import PrimarySpinnerLoader from "../loaders/PrimarySpinner";

export default function BannerComponent() {
  const { status } = useSession();
  return (
    <section
      className={`grid lg:grid-cols-2 gap-20 py-10 items-center ${container}`}
    >
      <main className=" text-center">
        <h1 className="text-5xl font-bold leading-14">
          Compassionate Care
          <br />
          <span className="text-primary">
            Anytime, <span className="text-secondary">Anywhere</span>
          </span>
        </h1>
        <p className="py-6 text-neutral max-lg:max-w-xl mx-auto">
          Supporting every stage of life with compassion and expertise - because
          everyone deserves love, care, and the chance to thrive.
        </p>
        {status === "loading" ? (
          <PrimarySpinnerLoader />
        ) : status === "authenticated" ? (
          <Link href={"/my-bookings"} className={largeBtnPrimary}>
            Explore Your Bookings
          </Link>
        ) : (
          <Link href={"/auth/register"} className={largeBtnPrimary}>
            Start The Tour
          </Link>
        )}
      </main>
      <figure className="relative max-w-xl w-full h-full aspect-square mx-auto">
        <Image src={"/hero.png"} alt="" fill className="" />
      </figure>
    </section>
  );
}
