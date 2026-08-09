const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

let db;

async function connectDatabase() {

try { 
    db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

        console.log("✅ Connected to MySQL!");

    return db;


}  catch (err) {

        console.log("❌ Database connection failed");
        console.log(err.message);
           throw err;

    }
}

app.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM employees");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    };
});

app.post("/employees", async (req, res) => {

    const { name, role } = req.body;

    const [result] = await db.query(
        "INSERT INTO employees (name, role) VALUES (?, ?)",
        [name, role]
    );

    res.json({
        id: result.insertId,
        name: name,
        role: role
    });
});
app.put("/employees/:id", async (req, res) => {

    const { name, role } = req.body;
    const { id } = req.params;

    const [result] = await db.query(
        "UPDATE employees SET name = ?, role = ? WHERE id = ?",
        [name, role, id]
    );

    res.json({
        message: "Employee updated successfully",
        id: id,
        name: name,
        role: role
    });
});

app.delete("/employees/:id", async (req, res) => {

    const { id } = req.params;

    const [result] = await db.query(
        "DELETE FROM employees WHERE id = ?",
        [id]
    );

    res.json({
        message: "Employee deleted successfully",
        id: id
    });
});

connectDatabase()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server started on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("Application startup failed:", err);
    })