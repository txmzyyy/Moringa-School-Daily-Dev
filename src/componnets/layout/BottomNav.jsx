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