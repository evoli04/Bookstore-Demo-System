import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { resetSystem } from "../services/resetService";
import BookList from "../components/BookList";
import AddBookForm from "../components/AddBookForm";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";
import UserManagement from "./UserManagement";

function AdminDashboard({ user, onLogout }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState("dashboard"); // dashboard, users
  
  // Bileşenleri reset sonrası zorla yenilemek için key state'leri
  const [userManagementKey, setUserManagementKey] = useState(0);
  const [chartKey, setChartKey] = useState(0); // Grafiği resetlemek için eklendi

  // Kitapları yükleme fonksiyonu
  const loadBooks = () => {
    getBooks().then(setBooks);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Resetleme işlemi
  const handleReset = async () => {
    try {
      if (window.confirm("⚠️ Tüm veriler silinecek ve demo haline dönecektir. Emin misiniz?")) {
        await resetSystem();
        
        // 1. Kitap listesini hemen güncelle
        loadBooks();
        
        // 2. Kullanıcı yönetimini resetle
        setUserManagementKey(prev => prev + 1);

        // 3. Grafiği resetle (Demo verilerine geri dönmesi için)
        setChartKey(prev => prev + 1);
        
        alert("✅ Sistem başarıyla resetlendi! Orijinal kitaplar ve demo kullanıcılar yüklendi.");
      }
    } catch (error) {
      alert("❌ Reset hatası: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>BookStore</h2>
        <p>Admin Panel</p>
        <p style={{fontSize: '12px', opacity: 0.8}}>{user.email}</p>

        <hr />

        <div className="sidebar-menu">
          <button 
            className={`menu-btn ${currentPage === "dashboard" ? "active" : ""}`}
            onClick={() => setCurrentPage("dashboard")}
          >
            📚 Kitap Yönetimi
          </button>
          
          <button 
            className={`menu-btn ${currentPage === "users" ? "active" : ""}`}
            onClick={() => setCurrentPage("users")}
          >
            👥 Müşteriler
          </button>
        </div>

        <hr />

        <button className="reset-btn-sidebar" onClick={handleReset}>
          🔄 Sistemi Resetle
        </button>

        <hr />

        <button className="logout-btn" onClick={onLogout}>
          🚪 Çıkış Yap
        </button>
      </aside>

      <main className="main-content">
        {currentPage === "dashboard" ? (
          <>
            <div className="panel-card">
              <h1>Admin Dashboard</h1>
              <p>Kitap, satış ve reset yönetimi</p>
            </div>

            {/* key={chartKey} sayesinde reset anında grafik eski demo verilerini tekrar çeker */}
            <div className="panel-card" key={chartKey}>
              <MonthlyRevenueChart />
            </div>

            <div className="panel-card form-card">
              <AddBookForm onBookAdded={loadBooks} />
            </div>

            <div className="panel-card">
              <BookList books={books} onDeleted={loadBooks} />
            </div>
          </>
        ) : (
          <UserManagement key={userManagementKey} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;