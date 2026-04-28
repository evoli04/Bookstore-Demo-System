export const getUsers = async () => {
  const response = await fetch("http://localhost:5000/api/users");
  if (!response.ok) {
    throw new Error("Kullanıcılar alınamadı");
  }
  return response.json();
};

export const addUser = async (user) => {
  const response = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kullanıcı eklenemedi");
  }

  return response.json();
};

export const updateUser = async (id, user) => {
  const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kullanıcı güncellenemedi");
  }

  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Kullanıcı silinemedi");
  }

  return response.json();
};
