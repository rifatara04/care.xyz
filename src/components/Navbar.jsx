"use client";

import Link from "next/link";
import NavLink from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import PrimarySpinnerLoader from "./loaders/PrimarySpinner";
import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";

export default function NavbarComponent() {
  const { status, data } = useSession();
  const handleLogOut = async () => {
    await signOut();
  };
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "about" },
    { title: "Faq", path: "faq" },
  ];
  return (
    <>
      <div className="lg:hidden dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-lg relative h-10 w-10 rounded-full p-1"
        >
          {status === "loading" ? (
            <PrimarySpinnerLoader />
          ) : status === "authenticated" ? (
            data?.user?.image ? (
              <Image
                className="rounded-full"
                fill
                alt=""
                src={data.user.image}
              />
            ) : (
              <span className="text-primary font-extrabold text-2xl">
                {data?.user?.name.slice(0, 1).toUpperCase()}
              </span>
            )
          ) : (
            <FaUserAlt className="size-5 text-neutral/85" />
          )}
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li className="border-b border-dashed border-neutral/15">
            <Link href={"/"} className="link link-neutral link-hover">
              Home
            </Link>
          </li>
          <li className="border-b border-dashed border-neutral/15">
            <Link href={"/about"} className="link link-neutral link-hover">
              About
            </Link>
          </li>
          <li className="border-b border-dashed border-neutral/15">
            <Link href={"/faq"} className="link link-neutral link-hover">
              Faq
            </Link>
          </li>
          {status === "loading" ? (
            <span className="skeleton w-20 h-6"></span>
          ) : data?.user?.role === "user" ? (
            <li className="border-b border-dashed border-neutral/15">
              <Link
                className="link link-neutral link-hover"
                href={"/my-bookings"}
              >
                My Bookings
              </Link>
            </li>
          ) : data?.user?.role === "admin" ? (
            <li className="border-b border-dashed border-neutral/15">
              <Link className="link link-neutral link-hover" href={"/booking"}>
                All Bookings
              </Link>
            </li>
          ) : null}
          {status === "authenticated" ? (
            <li>
              <button
                className="link link-error link-hover"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </li>
          ) : (
            <>
              <li className="border-b border-dashed border-neutral/15">
                <Link
                  href={"/auth/login"}
                  className="link link-primary link-hover"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href={"/auth/register"}
                  className="link link-secondary link-hover"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="lg:flex hidden gap-10">
        <nav className="flex items-center gap-7">
          {navLinks.map((link, index) => (
            <NavLink key={index} to={link.path}>
              {link.title}
            </NavLink>
          ))}
          {status === "loading" ? (
            <span className="skeleton w-20 h-6"></span>
          ) : data?.user?.role === "user" ? (
            <NavLink to={"/my-bookings"}>My Bookings</NavLink>
          ) : data?.user?.role === "admin" ? (
            <NavLink to={"/booking"}>All Bookings</NavLink>
          ) : null}
        </nav>
        {status === "loading" ? (
          <PrimarySpinnerLoader />
        ) : status === "authenticated" ? (
          <button className="btn btn-error" onClick={handleLogOut}>
            Logout
          </button>
        ) : (
          <nav className="flex items-center gap-2">
            <Link href={"/auth/login"} className="btn btn-primary btn-outline">
              Login
            </Link>
            <Link href={"/auth/register"} className="btn btn-secondary">
              Register
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
