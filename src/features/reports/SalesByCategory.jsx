
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = ["#795538", "#b99575", "#dfd2c5", "#4a3325"];

export default function SalesByCategory({ orders = [] }) {
    console.log("Orders received by SalesByCategory:", orders);
    const categorySales = {};

    orders.forEach((order) => {
        (order.items || []).forEach((item) => {
            const category =
                item.category ||
                item.product?.category ||
                "Uncategorized";

            const itemSales =
                Number(item.price || 0) * Number(item.quantity || 0);

            categorySales[category] =
                (categorySales[category] || 0) + itemSales;
        });
    });

    const data = Object.entries(categorySales).map(
        ([category, sales]) => ({
            category,
            sales: Number(sales.toFixed(2)),
        })
    );

    const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

    const chartData = data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <article className="reportPanel salesCategoryPanel">
            <div className="salesCategoryHeader">
                <div>
                    <h2>Sales by Category</h2>
                    <p>Revenue breakdown by product category</p>
                </div>

                <strong className="salesCategoryTotal">
                    ${totalSales.toFixed(2)}
                </strong>
            </div>

            {chartData.length === 0 ? (
                <p className="reportEmpty">
                    No category sales data available.
                </p>
            ) : (
                <div className="salesCategoryContent">
                    <div className="salesCategoryChart">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="sales"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={53}
                                    outerRadius={78}
                                    paddingAngle={3}
                                    stroke="none"
                                    label={false}
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        `$${Number(value).toFixed(2)}`,
                                        "Revenue",
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="salesCategoryLegend">
                        {chartData.map((item) => {
                            const percentage =
                                totalSales > 0
                                    ? (item.sales / totalSales) * 100
                                    : 0;

                            return (
                                <div
                                    className="salesCategoryRow"
                                    key={item.category}
                                >
                                    <div className="salesCategoryInfo">
                                        <span
                                            className="salesCategoryDot"
                                            style={{ backgroundColor: item.fill }}
                                        />

                                        <div>
                                            <strong>{item.category}</strong>
                                            <span>{percentage.toFixed(1)}% of revenue</span>
                                        </div>
                                    </div>

                                    <strong className="salesCategoryRevenue">
                                        ${item.sales.toFixed(2)}
                                    </strong>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </article>
    );
}
