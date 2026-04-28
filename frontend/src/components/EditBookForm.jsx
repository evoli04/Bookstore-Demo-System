import { useState } from "react";
import { updateBook } from "../services/bookService";

function EditBookForm({ book, onUpdated, onCancel }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [price, setPrice] = useState(book.price);
  const [soldCount, setSoldCount] = useState(book.sold_count);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      price: Number(price),
      image: book.image,
      sold_count: Number(soldCount),
    };

    await updateBook(book.id, updatedBook);

    setSuccessMessage("Kitap başarıyla güncellendi.");

    onUpdated();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <input
          type="number"
          value={soldCount}
          onChange={(e) => setSoldCount(e.target.value)}
        />
        <br />

        <button type="submit">Kaydet</button>
        <button type="button" onClick={onCancel}>İptal</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default EditBookForm;