import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;