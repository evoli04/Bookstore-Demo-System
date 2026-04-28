const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getAllUsers);
router.post("/users", addUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
