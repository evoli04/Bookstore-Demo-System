const saleService = require("../services/saleService");

const checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Sepet boş" });
    }

    await saleService.createSale(cartItems);

    res.json({ message: "Satın alma işlemi başarılı" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { checkout };