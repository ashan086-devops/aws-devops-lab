const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

async function connectDatabase() {

try {

const db = await mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "password123",
    database: "devopsdb"
});

        console.log("✅ Connected to MySQL!");

    return db;


}  catch (err) {

        console.log("❌ Database connection failed");
        console.log(err.message);
           throw err;

    }
}

connectDatabase()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server started on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("Application startup failed:", err);
    });