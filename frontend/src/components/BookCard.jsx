import { useState } from "react";
import { deleteBook } from "../services/bookService";
import EditBookForm from "./EditBookForm";

function BookCard({ book, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await deleteBook(book.id);
    onDeleted();
  };

  if (isEditing) {
  return (
    <div>
      <EditBookForm
        book={book}
        onUpdated={() => {
          onDeleted();
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    </div>
  );
}

  return (
  <div className="book-card">
    {book.image && (
      <img src={book.image} alt={book.title} className="book-image" />
    )}
    <h3>{book.title}</h3>
    <p>Yazar: {book.author}</p>
    <p>Fiyat: {book.price} TL</p>
    <p>Satış: {book.sold_count}</p>

    <button onClick={() => setIsEditing(true)}>Düzenle</button>
    <button className="delete-btn" onClick={handleDelete}>Sil</button>
  </div>
);
}

export default BookCard;