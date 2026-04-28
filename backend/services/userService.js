const pool = require("../config/db");

const getAllUsers = async () => {
  const result = await pool.query("SELECT id, email, role FROM users ORDER BY id");
  return result.rows;
};

const addUser = async (user) => {
  const { email, password, role } = user;

  // Email zaten varsa kontrol et
  const checkEmail = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (checkEmail.rows.length > 0) {
    throw new Error("Bu email zaten kayıtlı");
  }

  const result = await pool.query(
    `INSERT INTO users (email, password, role)
     VALUES ($1, $2, $3)
     RETURNING id, email, role`,
    [email, password, role]
  );

  return result.rows[0];
};

const updateUser = async (id, user) => {
  const { email, password, role } = user;

  const result = await pool.query(
    `UPDATE users
     SET email=$1, password=$2, role=$3
     WHERE id=$4
     RETURNING id, email, role`,
    [email, password, role, id]
  );

  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id=$1 RETURNING id, email, role",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
