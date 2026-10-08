import "./Dashboard.css"
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard(){
    const navigate=useNavigate();
    return(
        <div className="dashboardContainer">
            <nav className="dashboardNav">
                <a href="">🏠 Dashboard</a>
                <a href="">🛒 POS</a>
                <a href="">🧾 Orders</a>
                <a href="">📦 Products</a>
                <a href="">📊 Inventory</a>
                <a href="">👥 Customers</a>
                <a href="">📈 Reports</a>
                <a href="">⚙ Settings</a>
                <button className="logoutBtn" onClick={()=>navigate("/")}>
                    Logout
                </button>
            </nav>
        </div>
    );
}