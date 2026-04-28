import UserCard from "./UserCard";

function UserList({ users, onDeleted }) {
  return (
    <div>
      <h2>👥 Kullanıcı Listesi</h2>

      {users.length === 0 ? (
        <p>Kullanıcı bulunamadı</p>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDeleted={onDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
