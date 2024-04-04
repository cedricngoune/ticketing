import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/register" },
    !currentUser && { label: "Sign In", href: "/auth/login" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link href={href}>{label}</Link>
      </li>
    ));
  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        Ticketing
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav text-decoration-none gap-3 d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  );
};
