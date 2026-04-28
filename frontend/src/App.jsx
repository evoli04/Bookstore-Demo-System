import { useState } from "react";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerHome from "./pages/CustomerHome";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  return <CustomerHome user={user} onLogout={handleLogout} />;
}

export default App;