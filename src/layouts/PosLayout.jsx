import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./PosLayout.css";

export default function PosLayout() {
  return (
    <div className="posLayout">
      <Header />

      <div className="posBody">
        <Sidebar />

        <main className="posMain">
          <Outlet />
        </main>
      </div>
    </div>
  );
}