
import { useOrders } from "../context/OrdersContext";
import "./RecentOrders.css";

export default function RecentOrders() {
    const { orders } = useOrders();
    const recentOrders = orders.slice(0, 5);

    console.log("Orders in RecentOrders:", orders);
    return (
        <div className="recentOrders">
            <div className="recentOrdersHeader">
                <h2>Recent Orders</h2>
                <span>Latest {recentOrders.length} orders</span>
            </div>

            <div className="ordersTableWrapper">
                <table className="ordersTable">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer || "Walk-in Customer"}</td>
                                <td>{Number(order.total).toFixed(2)}</td>
                                <td>
                                    <span
                                        className={`orderStatus ${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {recentOrders.length === 0 && (
                            <tr>
                                <td colSpan="4" className="noOrders">
                                    No orders have been placed yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
