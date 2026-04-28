export const checkoutCart = async (cartItems) => {
  const response = await fetch("http://localhost:5000/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems }),
  });

  if (!response.ok) {
    throw new Error("Satın alma başarısız");
  }

  return response.json();
};