import { NavLink } from "react-router-dom";

function BottomNav() {
  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: "⌂",
    },
    {
      to: "/explore",
      label: "Explore",
      icon: "⌕",
    },
    {
      to: "/create",
      label: "Create",
      icon: "+",
    },
    {
      to: "/bookmarks",
      label: "Saved",
      icon: "♡",
    },
    {
      to: "/profile",
      label: "Profile",
      icon: "●",
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "active" : ""}`
          }
        >
          <span className="bottom-nav__icon">{item.icon}</span>
          <span className="bottom-nav__label">{item.label}</span>
        </NavLink>
        ))}
    </nav>
  );
}

export default BottomNav;