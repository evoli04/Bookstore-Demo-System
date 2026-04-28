const pool = require("../config/db");

const getAllBooks = async () => {
  const result = await pool.query("SELECT * FROM books ORDER BY id");
  return result.rows;
};

const addBook = async (book) => {
  const { title, author, price, image, sold_count } = book;

  const result = await pool.query(
    `INSERT INTO books (title, author, price, image, sold_count)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, author, price, image, sold_count || 0]
  );

  return result.rows[0];
};
const getTotalRevenue = async () => {
  const result = await pool.query(
    "SELECT SUM(price * sold_count) AS total FROM books"
  );

  return result.rows[0];
};
const updateBook = async (id, book) => {
  const { title, author, price, image, sold_count } = book;

  const result = await pool.query(
    `UPDATE books
     SET title=$1, author=$2, price=$3, image=$4, sold_count=$5
     WHERE id=$6
     RETURNING *`,
    [title, author, price, image, sold_count, id]
  );

  return result.rows[0];
};

const deleteBook = async (id) => {
  const result = await pool.query(
    "DELETE FROM books WHERE id=$1 RETURNING *",
    [id]
  );

  return result.rows[0];
};
const getMonthlyRevenue = async () => {
  const result = await pool.query(`
    SELECT 
      TO_CHAR(sale_date, 'YYYY-MM') AS month,
      SUM(total_price) AS revenue
    FROM sales
    GROUP BY TO_CHAR(sale_date, 'YYYY-MM')
    ORDER BY month
  `);

  return result.rows;
};
const getBookRevenueReport = async () => {
  const result = await pool.query(`
    SELECT 
      id,
      title,
      author,
      price,
      sold_count,
      (price * sold_count) AS revenue
    FROM books
    ORDER BY revenue DESC
  `);

  return result.rows;
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getTotalRevenue,
  getBookRevenueReport,
  getMonthlyRevenue
};