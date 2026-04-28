import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getMonthlyRevenue } from "../services/reportService";

function MonthlyRevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMonthlyRevenue().then((res) => {
      // string → number çevir
      const fixed = res.map((item) => ({
        ...item,
        revenue: Number(item.revenue),
      }));
      setData(fixed);
    });
  }, []);

  return (
    <div>
      <h2>Aylık Gelir Grafiği</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyRevenueChart;