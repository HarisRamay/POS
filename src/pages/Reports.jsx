import { useState } from "react";
import { useOrders } from "../context/OrdersContext";
import ReportSummary from "../features/reports/ReportSummary";
import SalesOverview from "../features/reports/SalesOverview";
import SalesByCategory from "../features/reports/SalesByCategory";
import TopSellingItems from "../features/reports/TopSellingItems";
import "./Reports.css";

export default function Reports() {
    const [period, setPeriod] = useState("7");

    const { orders } = useOrders();

    return (
        <main className="reportsPage">
            <header className="reportsHeader">
                <div>
                    <h1>Reports</h1>
                    <p>Track your sales, performance, and business insights.</p>
                </div>
                <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="All">All Time</option>
                </select>

            </header>
            <ReportSummary orders={orders} />
            <SalesOverview orders={orders} />
            <SalesByCategory orders={orders}/>
            <TopSellingItems orders={orders} />
            
        </main>
    );
}