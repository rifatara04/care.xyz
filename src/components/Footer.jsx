import MainLogoComponent from "./MainLogo";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";

export default function FooterComponent() {
  const socialLinks = [
    { path: "https://www.facebook.com/", icon: FaSquareFacebook },
    { path: "https://x.com/", icon: FaSquareXTwitter },
    { path: "https://www.instagram.com/", icon: FaSquareInstagram },
  ];
  return (
    <footer className="footer footer-horizontal footer-center bg-white shadow-[0_-1px_4px_0_#ccc8] py-20 px-6">
      <aside>
        <MainLogoComponent />
        <p className="max-w-xl mx-auto text-center text-neutral/90 mb-3">
          Supporting every stage of life with compassion and expertise - because
          everyone deserves love, care, and the chance to thrive.
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          {socialLinks.map((link, index) => (
            <a
              href={link.path}
              key={index}
              className="text-neutral hover:text-primary transition-all"
            >
              <link.icon className="size-7" />
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
}
