const pool = require("../config/db");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND password=$2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { login };