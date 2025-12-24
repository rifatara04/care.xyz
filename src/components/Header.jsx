import Link from "next/link";
import MainLogoComponent from "./MainLogo";
import NavbarComponent from "./Navbar";

export default function HeaderComponent() {
  return (
    <header className="bg-white shadow py-4 px-3 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <Link href={"/"}>
        <MainLogoComponent />
      </Link>
      <div>
        <NavbarComponent />
      </div>
    </header>
  );
}
