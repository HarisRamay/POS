import "./Sidebar.css"
import { useNavigate, NavLink } from "react-router-dom";
export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="dashboardContainer">
            <nav className="dashboardNav">
                <NavLink to="/dashboard">📊 Dashboard</NavLink>
                <NavLink to="/mainpage">🛒 New Order</NavLink>
                <NavLink to="/orders">🧾 Orders</NavLink>
                <NavLink to="/inventory">📊 Inventory</NavLink>
                 <NavLink to="/customers">👥 Customers</NavLink>
                 <NavLink to="/reports">📈 Reports</NavLink>
                 <NavLink to="/settings">⚙ Settings</NavLink>
                <button className="logoutBtn" onClick={() => navigate("/")}>
                    Logout
                </button>
            </nav>
        </div>
    );
}