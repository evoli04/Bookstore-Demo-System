import { useState } from "react";
import { addUser } from "../services/userService";

function AddUserForm({ onUserAdded }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Tüm alanları doldurunuz!");
      return;
    }

    try {
      await addUser(formData);
      setFormData({ email: "", password: "", role: "customer" });
      alert("✅ Kullanıcı başarıyla eklendi!");
      onUserAdded();
    } catch (error) {
      alert("❌ Hata: " + error.message);
    }
  };

  return (
    <div className="form-card">
      <h3>👤 Yeni Kullanıcı Ekle</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">👥 Müşteri</option>
          <option value="admin">👤 Admin</option>
        </select>

        <button type="submit">➕ Ekle</button>
      </form>
    </div>
  );
}

export default AddUserForm;
