import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <Header />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
