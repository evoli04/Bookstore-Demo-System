const bookService = require("../services/bookService");

const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = await bookService.addBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);

    if (!updatedBook) {
      return res.status(404).json({ message: "Kitap bulunamadı" });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookService.deleteBook(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Kitap bulunamadı" });
    }

    res.json({ message: "Kitap silindi", deletedBook });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const pool = require("../config/db");

const getTotalRevenue = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT SUM(price * sold_count) AS total FROM books"
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};
const getBookRevenueReport = async (req, res) => {
  try {
    const report = await bookService.getBookRevenueReport();
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};
const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await bookService.getMonthlyRevenue();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getTotalRevenue,
  getBookRevenueReport,
  getMonthlyRevenue,
};