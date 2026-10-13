
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 12000 },
  { day: "Tue", sales: 18000 },
  { day: "Wed", sales: 15000 },
  { day: "Thu", sales: 24000 },
  { day: "Fri", sales: 20000 },
  { day: "Sat", sales: 32000 },
  { day: "Sun", sales: 27000 },
];

export default function SalesChart() {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            formatter={(value) => [
              `Rs. ${Number(value).toLocaleString()}`,
              "Sales",
            ]}
          />
          <Bar dataKey="sales" fill="#8b7355" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
