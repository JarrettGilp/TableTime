import express from "express";
import cors from "cors";
import pool from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

//Reservations Endpoints
app.post("/api/reservations", async (req, res) => {
  const { firstName, lastName, restaurantName, tableID, date, time, partySize } = req.body;

  try {
    const query = `
      INSERT INTO Reservations 
      (rv_customerfirstname, rv_customerlastname, rv_restaurantname, rv_tableid, rv_date, rv_time, rv_partysize, rv_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'Confirmed')
      RETURNING *;
    `;
    const values = [firstName, lastName, restaurantName, tableID, date, time, partySize];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/api/reservations/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, restaurantName, tableID, date, time, partySize, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Reservations
       SET rv_customerfirstname = $1,
           rv_customerlastname = $2,
           rv_restaurantname = $3,
           rv_tableid = $4,
           rv_date = $5,
           rv_time = $6,
           rv_partysize = $7,
           rv_status = $8
       WHERE rv_id = $9
       RETURNING *;`,
      [firstName, lastName, restaurantName, tableID, date, time, partySize, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


app.delete("/api/reservations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM Reservations WHERE rv_id = $1;`, [id]);
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// All reservations
// backend/index.js
app.get("/api/reservations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Reservations ORDER BY rv_id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Reservations for a specific table/date
app.get("/api/reservations/filter", async (req, res) => {
  const { tableID, date } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM Reservations
       WHERE rv_tableID = $1 AND rv_date = $2
       ORDER BY rv_time;`,
      [tableID, date]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});




app.listen(3000, () => console.log("Server running on port 3000"));
