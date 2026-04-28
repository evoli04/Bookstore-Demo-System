const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getTotalRevenue,
  getBookRevenueReport,
  getMonthlyRevenue,
} = require("../controllers/bookController");

router.get("/books", getAllBooks);
router.post("/books", addBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);
router.get("/revenue/report", getBookRevenueReport);
router.get("/revenue", getTotalRevenue);
router.get("/revenue/monthly", getMonthlyRevenue);

module.exports = router;