import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrders";
import "./Dashboard.css";

const stats = [
    { title: "Today's Sales", value: "Rs. 128,400", detail: "Today's revenue" },
    { title: "Total Orders", value: "86", detail: "Orders today" },
    { title: "Average Order", value: "Rs. 1,493", detail: "Per order" },
    { title: "Low Stock", value: "5 Items", detail: "Needs attention" },
];

export default function Dashboard() {
    return (
        <div className="dashboardPage">
            <div className="dashboardHeading">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's your restaurant overview.</p>
                </div>
            </div>

            <div className="statsGrid">
                {stats.map((stat) => (
                    <div className="statCard" key={stat.title}>
                        <p>{stat.title}</p>
                        <h2>{stat.value}</h2>
                        <span>{stat.detail}</span>
                    </div>
                ))}
            </div>

            <div className="dashboardBottom">
                <section className="dashboardPanel">
                    <h2>Sales Overview</h2>
                    <SalesChart />
                </section>

                <section className="dashboardPanel">
                    <RecentOrders />
                </section>
            </div>
        </div>
    );
}
