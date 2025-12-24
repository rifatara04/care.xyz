import Link from "next/link";

export default function NavLink({ to, children }) {
  return <Link href={to}>{children}</Link>;
}
