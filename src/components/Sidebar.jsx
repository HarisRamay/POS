import "./Sidebar.css"
import { useNavigate, NavLink } from "react-router-dom";
export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="dashboardContainer">
            <nav className="dashboardNav">
                <NavLink to="/dashboard">📊 Dashboard</NavLink>
                <NavLink to="/mainpage">🛒 POS</NavLink>
                <NavLink to="/orders">🧾 Orders</NavLink>
                <NavLink to="/products">📦 Products</NavLink>
                <NavLink to="/inventory">📊 Inventory</NavLink>
                 <NavLink to="/customers">👥 Customers</NavLink>
                <a href="">📈 Reports</a>
                <a href="">⚙ Settings</a>
                <button className="logoutBtn" onClick={() => navigate("/")}>
                    Logout
                </button>
            </nav>
        </div>
    );
}