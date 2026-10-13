import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrders";
import "./Dashboard.css";
import { useOrders } from "../context/OrdersContext";

const stats = [
    { title: "Today's Sales", value: "Rs. 128,400", detail: "Today's revenue" },
    { title: "Total Orders", value: "86", detail: "Orders today" },
    { title: "Average Order", value: "Rs. 1,493", detail: "Per order" },
    { title: "Low Stock", value: "5 Items", detail: "Needs attention" },
];

export default function Dashboard() {
    const { orders } = useOrders();

    const completedOrders = orders.filter(
        (order) => order.status === "Completed"
    );

    const today = new Date().toDateString();

    const todaysOrders = orders.filter(
        (order) => new Date(order.createdAt).toDateString() === today
    );

    const todaysCompletedOrders = todaysOrders.filter(
        (order) => order.status === "Completed"
    );

    const todaysSales = todaysCompletedOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const averageOrder = todaysCompletedOrders.length
        ? todaysSales / todaysCompletedOrders.length
        : 0;
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
