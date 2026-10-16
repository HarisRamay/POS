import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function SalesOverview({ orders }) {
    const dailySales = {};

    orders.forEach((order) => {
        const date = new Date(order.createdAt);

        if (Number.isNaN(date.getTime())) return;

        const key = date.toLocaleDateString("en-CA");

        dailySales[key] =
            (dailySales[key] || 0) + Number(order.total || 0);
    });

    const data = Object.entries(dailySales)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, sales]) => ({
            date: new Date(`${date}T12:00:00`).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
            }),
            sales: Number(sales.toFixed(2)),
        }));
    return (
        <article className="reportPanel">
            <h2>Sales Overview</h2>

            {data.length === 0 ? (
                <p className="reportEmpty">
                    No sales data available.
                </p>
            ) : (
                <div className="reportChart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) =>
                                    `Rs ${Number(value).toFixed(2)}`
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#795538"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </article>
    );
}