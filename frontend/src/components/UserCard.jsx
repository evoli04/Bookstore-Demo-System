import { useState } from "react";
import { deleteUser } from "../services/userService";
import EditUserForm from "./EditUserForm";

function UserCard({ user, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`${user.email} adlı kullanıcıyı silmek istediğinize emin misiniz?`)) {
      try {
        const result = await deleteUser(user.id);
        console.log("Silme işlemi başarılı:", result);
        alert("✅ Kullanıcı başarıyla silindi!");
        onDeleted();
      } catch (error) {
        console.error("Silme hatası:", error);
        alert("❌ Silme hatası: " + error.message);
      }
    }
  };

  if (isEditing) {
    return (
      <EditUserForm
        user={user}
        onUpdated={() => {
          onDeleted();
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="user-card">
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> <span className={`role-badge ${user.role}`}>{user.role === 'admin' ? '👤 Admin' : '👥 Müşteri'}</span></p>
      </div>
      <div className="user-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️ Düzenle</button>
        <button className="delete-btn" onClick={handleDelete}>🗑️ Sil</button>
      </div>
    </div>
  );
}

export default UserCard;
