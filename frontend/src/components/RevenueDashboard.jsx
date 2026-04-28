import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  getTotalRevenue,
  getBookRevenueReport,
} from "../services/reportService";

function RevenueDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [report, setReport] = useState([]);

  const loadRevenueData = async () => {
    const totalData = await getTotalRevenue();
    const reportData = await getBookRevenueReport();

    setTotalRevenue(Number(totalData.total));
    setReport(reportData);
  };

  useEffect(() => {
    loadRevenueData();
  }, []);

  return (
    <div>
      <h2>Gelir Raporu</h2>

      <h3>Toplam Gelir: {totalRevenue} TL</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={report}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueDashboard;