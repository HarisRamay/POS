export default function TopSellingItems({orders=[]}) {
    const itemTotals = {};

    orders.forEach((order) => {
        (order.items || []).forEach((item) => {
            const key = item.id ?? item.name;

            if (!itemTotals[key]) {
                itemTotals[key] = {
                    id: key,
                    name: item.name,
                    quantity: 0,
                    revenue: 0,
                };
            }

            itemTotals[key].quantity += Number(item.quantity || 0);

            itemTotals[key].revenue +=
                Number(item.price || 0) * Number(item.quantity || 0);
        });
    });
    const topItems = Object.values(itemTotals)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
   return (
  <article className="reportPanel">
    <h2>Top Selling Items</h2>

    {topItems.length === 0 ? (
      <p className="reportEmpty">
        No item sales data available.
      </p>
    ) : (
      <div className="reportTableWrapper">
        <table className="reportTable">
          <thead>
            <tr>
              <th>Product</th>
              <th>Units Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {topItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs {item.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </article>
);
}