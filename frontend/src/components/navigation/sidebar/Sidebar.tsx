import {
  CalendarClock,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  User,
} from "lucide-react";
import SidebarLink from "./SidebarLink";
import SideNav from "./SideNav";

const linkIconProps = {
  size: 20,
};

const links = [
  {
    to: "/",
    label: "Dashboard",
    icon: <LayoutDashboard {...linkIconProps} />,
    active: true,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: <User {...linkIconProps} />,
    active: false,
  },
  {
    to: "/event",
    label: "Events",
    icon: <CalendarClock {...linkIconProps} />,
    active: false,
  },
  {
    to: "/event/my-invitations",
    label: "Invitations",
    icon: <Mail {...linkIconProps} />,
    active: false,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: <Settings {...linkIconProps} />,
    active: false,
  },
  {
    to: "/signout",
    label: "Sign out",
    icon: <LogOut {...linkIconProps} />,
    active: false,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-gray-700 text-white">
      <div className="m-4 mt-10">
        <h4 className="text-2xl text-center">CerInv</h4>
        <div className="mt-8">
          <SideNav>
            {links.map((link) => (
              <SidebarLink {...link} key={link.label} />
            ))}
          </SideNav>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
