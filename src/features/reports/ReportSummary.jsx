export default function ReportSummary({ orders }) {
    const totalSales = orders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );
    const totalOrders = orders.length;

    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    const totalItemsSold = orders.reduce(
        (sum, order) =>
            sum +
            (order.items || []).reduce(
                (itemSum, item) => itemSum + Number(item.quantity || 0),
                0
            ),
        0
    );
    return (
        <section className="reportSummary">
            <article className="reportStatCard">
                <span>Total Sales</span>
                <strong>Rs {totalSales.toFixed(2)}</strong>
            </article>

            <article className="reportStatCard">
                <span>Total Orders</span>
                <strong>{totalOrders}</strong>
            </article>

            <article className="reportStatCard">
                <span>Average Order Value</span>
                <strong>Rs {averageOrderValue.toFixed(2)}</strong>
            </article>

            <article className="reportStatCard">
                <span>Total Items Sold</span>
                <strong>{totalItemsSold}</strong>
            </article>
        </section>
    );
}