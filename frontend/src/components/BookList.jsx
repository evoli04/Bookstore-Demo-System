import BookCard from "./BookCard";

function BookList({ books, onDeleted }) {
 return (
  <div>
    <h2>Kitap Listesi</h2>

    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDeleted={onDeleted} />
      ))}
    </div>
  </div>
);
}

export default BookList;