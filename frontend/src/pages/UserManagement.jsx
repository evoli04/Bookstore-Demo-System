import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import UserList from "../components/UserList";
import AddUserForm from "../components/AddUserForm";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Kullanıcı yükleme hatası:", error);
      alert("❌ Kullanıcılar yüklenemedi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="management-page">
      <div className="panel-card form-card">
        <AddUserForm onUserAdded={loadUsers} />
      </div>

      <div className="panel-card">
        {loading ? (
          <p>Yükleniyor...</p>
        ) : (
          <UserList users={users} onDeleted={loadUsers} />
        )}
      </div>
    </div>
  );
}

export default UserManagement;
