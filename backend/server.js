const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const Razorpay = require("razorpay");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let db;

/* ---------------- MYSQL CONNECTION ---------------- */

function connectDatabase() {
  db = mysql.createConnection({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "ecommerce_db"
  });

  db.connect((err) => {
    if (err) {
      console.log("Database connection failed. Retrying in 5 seconds...");
      setTimeout(connectDatabase, 5000);
    } else {
      console.log("Connected to MySQL Database");
    }
  });
}

connectDatabase();

/* ---------------- RAZORPAY SETUP ---------------- */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/* ---------------- ROOT ---------------- */

app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running Successfully");
});

/* ---------------- GET PRODUCTS ---------------- */

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

/* ---------------- ADD PRODUCT ---------------- */

app.post("/products", (req, res) => {
  const { name, price, description, image } = req.body;

  const sql = `
    INSERT INTO products (name, price, description, image)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, price, description, image],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          message: "Product added successfully",
          result
        });
      }
    }
  );
});

/* ---------------- DELETE PRODUCT ---------------- */

app.delete("/products/:id", (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({
        message: "Product deleted successfully"
      });
    }
  });
});

/* ---------------- CREATE PAYMENT ORDER ---------------- */

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Payment order creation failed");
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});