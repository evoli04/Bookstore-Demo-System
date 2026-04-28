export const getTotalRevenue = async () => {
  const response = await fetch("http://localhost:5000/api/revenue");

  if (!response.ok) {
    throw new Error("Toplam gelir alınamadı");
  }

  return response.json();
};

export const getBookRevenueReport = async () => {
  const response = await fetch("http://localhost:5000/api/revenue/report");

  if (!response.ok) {
    throw new Error("Kitap bazlı rapor alınamadı");
  }

  return response.json();
};

export const getMonthlyRevenue = async () => {
  const response = await fetch("http://localhost:5000/api/revenue/monthly");

  if (!response.ok) {
    throw new Error("Aylık gelir alınamadı");
  }

  return response.json();
};