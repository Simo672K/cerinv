import Navbar from "@/components/navigation/navbar/Navbar";
import Sidebar from "@/components/navigation/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardTemplate = () => {
  return (
    <div className="h-full flex bg-[#EFF8F6]">
      <Sidebar />
      <main className="grow">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardTemplate;
