export const getBooks = async () => {
  const response = await fetch("http://localhost:5000/api/books");

  if (!response.ok) {
    throw new Error("Kitaplar alınamadı");
  }

  return response.json();
};

export const addBook = async (book) => {
  const response = await fetch("http://localhost:5000/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Kitap eklenemedi");
  }

  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`http://localhost:5000/api/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Kitap silinemedi");
  }

  return response.json();
};

export const updateBook = async (id, book) => {
  const response = await fetch(`http://localhost:5000/api/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Kitap güncellenemedi");
  }

  return response.json();
};