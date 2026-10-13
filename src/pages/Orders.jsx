
import { useState } from "react";
import { useOrders } from "../context/OrdersContext";
import "./Orders.css";

const filters = [
    "All",
    "Pending",
    "Preparing",
    "Completed",
    "Cancelled",
];

export default function Orders() {
    const { orders, updateOrderStatus } = useOrders();
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredOrders = orders.filter((order) => {
        const query = search.toLowerCase();

        const matchesSearch =
            order.id.toLowerCase().includes(query) ||
            (order.customer || "").toLowerCase().includes(query);

        const matchesStatus =
            activeFilter === "All" || order.status === activeFilter;

        return matchesSearch && matchesStatus;
    });

    const completedOrders = orders.filter(
        (order) => order.status === "Completed"
    );

    const totalSales = completedOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const pendingCount = orders.filter(
        (order) => order.status === "Pending"
    ).length;

    return (
        <div className="ordersPage">
            <div className="ordersPageHeader">
                <div>
                    <h1>Orders</h1>
                    <p>Manage and track your restaurant orders.</p>
                </div>
            </div>

            <div className="orderStats">
                <div className="orderStatCard">
                    <span>Total Orders</span>
                    <h2>{orders.length}</h2>
                    <p>All recorded orders</p>
                </div>

                <div className="orderStatCard">
                    <span>Completed Orders</span>
                    <h2>{completedOrders.length}</h2>
                    <p>Successfully completed</p>
                </div>

                <div className="orderStatCard">
                    <span>Pending Orders</span>
                    <h2>{pendingCount}</h2>
                    <p>Awaiting processing</p>
                </div>

                <div className="orderStatCard">
                    <span>Completed Sales</span>
                    <h2>${totalSales.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</h2>
                    <p>Completed orders only</p>
                </div>
            </div>

            <div className="ordersContent">
                <div className="ordersToolbar">
                    <div>
                        <h2>All Orders</h2>
                        <p>View and manage your transactions.</p>
                    </div>

                    <input
                        type="search"
                        className="ordersSearch"
                        placeholder="Search order ID or customer..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <div className="orderFilters">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`orderFilter ${
                                activeFilter === filter ? "active" : ""
                            }`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="ordersTableWrapper">
                    <table className="ordersPageTable">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="orderId">{order.id}</td>
                                    <td>{order.customer || "Walk-in Customer"}</td>
                                    <td>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </td>
                                    <td>
                                        {order.items.reduce(
                                            (sum, item) => sum + item.quantity,
                                            0
                                        )}
                                    </td>
                                    <td className="orderAmount">
                                        ${Number(order.total).toFixed(2)}
                                    </td>
                                    <td>{order.payment || "Cash"}</td>
                                    <td>
                                        <select
                                            className="orderStatusSelect"
                                            value={order.status}
                                            onChange={(event) =>
                                                updateOrderStatus(
                                                    order.id,
                                                    event.target.value
                                                )
                                            }
                                        >
                                            {filters
                                                .filter((status) => status !== "All")
                                                .map((status) => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}

                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="noOrders">
                                        No orders found. Place an order in the POS
                                        to see it here.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="ordersFooter">
                    Showing {filteredOrders.length} of {orders.length} orders
                </div>
            </div>
        </div>
    );
}
