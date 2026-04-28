const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Silmek için kullanıcı bulunamadı" });
    }

    res.json({ message: "✅ Kullanıcı başarıyla silindi", deletedUser });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Silme hatası: " + err.message });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
