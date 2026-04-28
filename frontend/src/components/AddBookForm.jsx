import { useState } from "react";
import { addBook } from "../services/bookService";

function AddBookForm({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      price: Number(price),
      image: "default.jpg",
      sold_count: 0,
    };

    await addBook(newBook);

    onBookAdded();

    setTitle("");
    setAuthor("");
    setPrice("");
  };

  return (
    <div>
      <h3>Yeni Kitap Ekle</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Kitap adı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          placeholder="Yazar"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />

        <input
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export default AddBookForm;