import { useState } from "react";
import { updateUser } from "../services/userService";

function EditUserForm({ user, onUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    email: user.email,
    password: "",
    role: user.role,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Email ve şifre gereklidir!");
      return;
    }

    try {
      setLoading(true);
      await updateUser(user.id, formData);
      alert("✅ Kullanıcı başarıyla güncellendi!");
      onUpdated();
    } catch (error) {
      alert("❌ Hata: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-form-overlay">
      <div className="form-card">
        <h3>✏️ Kullanıcıyı Düzenle</h3>
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
            placeholder="Yeni Şifre"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="customer">👥 Müşteri</option>
            <option value="admin">👤 Admin</option>
          </select>

          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              💾 Kaydet
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              ❌ İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
