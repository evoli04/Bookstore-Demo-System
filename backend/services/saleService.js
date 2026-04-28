const pool = require("../config/db");

const createSale = async (cartItems) => {
  for (const item of cartItems) {
    await pool.query(
      `INSERT INTO sales (book_id, quantity, total_price, sale_date)
       VALUES ($1, $2, $3, CURRENT_DATE)`,
      [item.id, item.quantity, item.price * item.quantity]
    );

    await pool.query(
      `UPDATE books
       SET sold_count = sold_count + $1
       WHERE id = $2`,
      [item.quantity, item.id]
    );
  }
};

module.exports = { createSale };