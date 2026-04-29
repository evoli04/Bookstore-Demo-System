const pool = require("../config/db");

const resetData = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // TRUNCATE ve RESTART IDENTITY: Verileri siler ve ID sayaçlarını (1,2,3...) sıfırlar. 
    // Bu sayede sistem her resetlendiğinde tam olarak aynı ID'lerle başlar.
    await client.query("TRUNCATE TABLE sales, books, users RESTART IDENTITY CASCADE");

    // 1. Kitap verilerini ekle (ID belirtmiyoruz, SERIAL kendisi 1'den başlayarak atasın)
    await client.query(`
      INSERT INTO books (title, author, price, image, sold_count)
      VALUES
        ('Aşk-ı Memnu', 'Halit Ziya Uşaklıgil', 185, '/images/img1.png', 42),
        ('Sefiller', 'Victor Hugo', 210, '/images/img2.png', 35),
        ('1984', 'George Orwell', 250, '/images/img3.png', 100),
        ('Dönüşüm', 'Franz Kafka', 220, '/images/img4.png', 150),
        ('Suç ve Ceza', 'Fyodor Dostoyevski', 210, '/images/img5.png', 80),
        ('Mekanik Portakal', 'Anthony Burgess', 230, '/images/img6.png', 120),
        ('Çavdar Tarlasında Çocuklar', 'J.D. Salinger', 240, '/images/img7.png', 50),
        ('İstanbul Hatıraları', 'Ahmet Ümit', 300, '/images/img8.png', 60),
        ('Beyaz Zambaklar Ülkesinde', 'Grigory Petrov', 220, '/images/img9.png', 70),
        ('Simyacı', 'Paulo Coelho', 180, '/images/img10.png', 110)
    `);

    // 2. Hazır satış verilerini ekle (Orijinal demo grafiği için)
    await client.query(`
      INSERT INTO sales (book_id, quantity, total_price, sale_date)
      VALUES
        (1, 10, 1850, '2026-01-10'),
        (1, 5, 925, '2026-02-15'),
        (2, 8, 1680, '2026-01-20'),
        (3, 15, 3750, '2026-03-25'),
       
    `);

    // 3. Kullanıcıları ekle
    await client.query(`
      INSERT INTO users (email, password, role)
      VALUES
        ('admin@bookstore.com', 'admin123', 'admin'),
        ('customer@bookstore.com', 'customer123', 'customer')
    `);

    await client.query("COMMIT");
    res.json({ message: "✅ Sistem başarıyla resetlendi! Grafik ve tablolar demo haline döndü." });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Reset hatası:", err);
    res.status(500).json({ message: "Reset hatası: " + err.message });
  } finally {
    client.release();
  }
};

module.exports = { resetData };
