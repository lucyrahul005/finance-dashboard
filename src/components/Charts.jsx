import {
  LineChart,
  Line,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "../context/FinanceContext";

const Charts = () => {
  const { transactions } = useFinance();

  const lineData = transactions.map((t, i) => ({
    date: `Day ${i + 1}`,
    amount: t.amount,
  }));

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="h-[250px]">
        <ResponsiveContainer>
          <LineChart data={lineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="amount"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="value">
              {pieData.map((_, i) => (
                <Cell key={i} fill={["#6366f1", "#22c55e", "#f59e0b"][i % 3]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
