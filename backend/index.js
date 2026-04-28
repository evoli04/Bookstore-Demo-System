const express = require("express");
const cors = require("cors");

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const resetRoutes = require("./routes/resetRoutes");
const saleRoutes = require("./routes/saleRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BookStore Demo Recovery API çalışıyor 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/seed-books", async (req, res) => {
  try {
    const sampleBooks = [
      { title: "1984", author: "George Orwell", price: 45.99, image: "/images/img1.png", sold_count: 1250 },
      { title: "To Kill a Mockingbird", author: "Harper Lee", price: 39.99, image: "/images/img2.png", sold_count: 980 },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 35.50, image: "/images/img3.png", sold_count: 750 },
      { title: "Pride and Prejudice", author: "Jane Austen", price: 32.00, image: "/images/img4.png", sold_count: 890 },
      { title: "The Catcher in the Rye", author: "J.D. Salinger", price: 38.75, image: "/images/img5.png", sold_count: 650 },
      { title: "Wuthering Heights", author: "Emily Brontë", price: 36.25, image: "/images/img6.png", sold_count: 420 },
      { title: "Jane Eyre", author: "Charlotte Brontë", price: 34.99, image: "/images/img7.png", sold_count: 560 },
      { title: "The Lord of the Rings", author: "J.R.R. Tolkien", price: 59.99, image: "/images/img8.png", sold_count: 2100 },
      { title: "The Hobbit", author: "J.R.R. Tolkien", price: 44.99, image: "/images/img9.png", sold_count: 1850 },
      { title: "Brave New World", author: "Aldous Huxley", price: 42.50, image: "/images/img10.png", sold_count: 1200 }
    ];

    // Önce mevcut kitapları kontrol et
    const existingBooks = await pool.query("SELECT COUNT(*) FROM books");
    
    if (existingBooks.rows[0].count > 0) {
      return res.json({ message: "Veritabanında kitap var, tekrar eklenmedi" });
    }

    // Kitapları ekle
    for (const book of sampleBooks) {
      await pool.query(
        "INSERT INTO books (title, author, price, image, sold_count) VALUES ($1, $2, $3, $4, $5)",
        [book.title, book.author, book.price, book.image, book.sold_count]
      );
    }

    res.json({ message: "10 örnek kitap başarıyla eklendi!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", userRoutes);
app.use("/api", saleRoutes);
app.use("/api", resetRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});