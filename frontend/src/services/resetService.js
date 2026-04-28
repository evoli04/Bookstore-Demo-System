export const resetSystem = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/reset", {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Reset başarısız");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Sunucuya bağlanılamadı");
  }
};