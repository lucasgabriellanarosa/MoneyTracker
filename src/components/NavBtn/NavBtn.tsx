import { NavLink } from "react-router";

function NavBtn({ children, title, to }: { children: React.ReactNode, title: string, to: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center ${
          isActive ? "text-gray-800" : "text-gray-500"
        }`
      }
    >
      {children}
      <span className="text-sm">{title}</span>
    </NavLink>
  );
}

export default NavBtn;
