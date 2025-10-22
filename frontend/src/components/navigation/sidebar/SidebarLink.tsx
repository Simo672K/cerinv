import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface LinkProps {
  to: string;
  icon?: string | React.ReactNode;
  active?: boolean;
  label?: string;
}

const SidebarLink = ({ to, active, label, icon }: LinkProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={cn(
          "px-4 py-2 my-2 rounded-md flex hover:text-gray-700 hover:bg-[#EFF8F6] items-center",
          active && "text-gray-700 bg-[#EFF8F6]"
        )}
      >
        {icon}
        <span className="ms-2">{label}</span>
      </NavLink>
    </li>
  );
};
export default SidebarLink;
