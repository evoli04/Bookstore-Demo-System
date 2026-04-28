import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { checkoutCart } from "../services/checkoutService";

function CustomerHome({ user, onLogout }) {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Kitapları veritabanından çekme
  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  // Sepete kitap ekleme
  const addToCart = (book) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === book.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  // Sepetten kitap çıkarma
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Sepeti onaylama ve satın alma işlemi
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Sepet boş.");
      return;
    }

    await checkoutCart(cart);
    setCart([]);
    setShowCart(false);
    alert("Satın alma işlemi başarılı!");
  };

  // Sepetteki ürünlerin toplam fiyatı
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>BookStore</h2>
        <p>Müşteri Paneli</p>
        <p>{user.email}</p>
        <hr />
        <p>📚 Kitaplar</p>
       
        <hr />
        <button className="logout-btn" onClick={onLogout}>
          🚪 Çıkış Yap
        </button>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <button
            className="cart-icon-btn"
            onClick={() => setShowCart(!showCart)}
          >
            🛒
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </button>

          {showCart && (
            <div className="cart-dropdown">
              <h3>Sepetim</h3>

              {cart.length === 0 ? (
                <p>Sepet boş.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <strong>{item.title}</strong>
                      <p>Adet: {item.quantity}</p>
                      <p>Toplam: {item.price * item.quantity} TL</p>

                      <button
                        className="delete-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Çıkar
                      </button>
                    </div>
                  ))}

                  <h4>Genel Toplam: {totalPrice} TL</h4>
                  <button onClick={handleCheckout}>Satın Al</button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="panel-card">
          <h1>Müşteri Sayfası</h1>
          <p>Kitapları inceleyebilir ve sepete ekleyebilirsin.</p>
        </div>

        <div className="panel-card">
          <h2>Kitaplar</h2>

          <div className="book-grid">
            {books.map((book) => (
              <div className="book-card" key={book.id}>
                {book.image && (
                  <img src={book.image} alt={book.title} className="book-image" />
                )}
                <h3>{book.title}</h3>
                <p>Yazar: {book.author}</p>
                <p>Fiyat: {book.price} TL</p>

                <button onClick={() => addToCart(book)}>
                  Sepete Ekle
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CustomerHome;