
import "./RecentOrders.css";

const orders = [
  {
    id: "#ORD-1001",
    customer: "Ali Ahmed",
    amount: 2450,
    payment: "Cash",
    status: "Completed",
  },
  {
    id: "#ORD-1002",
    customer: "Sara Khan",
    amount: 1800,
    payment: "Card",
    status: "Preparing",
  },
  {
    id: "#ORD-1003",
    customer: "Usman Malik",
    amount: 3200,
    payment: "Cash",
    status: "Pending",
  },
  {
    id: "#ORD-1004",
    customer: "Ayesha Noor",
    amount: 1250,
    payment: "Card",
    status: "Completed",
  },
  {
    id: "#ORD-1005",
    customer: "Hamza Ali",
    amount: 2100,
    payment: "Cash",
    status: "Cancelled",
  },
];

export default function RecentOrders() {
  return (
    <div className="recentOrders">
      <div className="recentOrdersHeader">
        <h2>Recent Orders</h2>
        <span>Latest 5 orders</span>
      </div>

      <div className="ordersTableWrapper">
        <table className="ordersTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>Rs. {order.amount.toLocaleString()}</td>
                <td>{order.payment}</td>
                <td>
                  <span
                    className={`orderStatus ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
