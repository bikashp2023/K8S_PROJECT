const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 20, // maximum number of connections in the pool
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/expenses", (req, res) => {
  pool.query("SELECT * from expense", (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.send("Error querying database.");
    } else {
      res.status(200).json(result.rows);
    }
  });
});

app.post("/expenses", (req, res) => {
  const { comment, amount, insertdate } = req.body;
  pool.query(
    "insert into expense (comment, amount, insertdate) values ($1, $2, $3)",
    [comment, amount, insertdate],
    (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(400).send("Error querying database.");
      } else {
        res.status(201).send();
      }
    }
  );
});

app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  pool.query("delete from expense where id=$1", [id], (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(400).send("Error querying database.");
    } else {
      res.status(200).send("Deleted successfully");
    }
  });
});

// Close the pool when the application is shutting down
process.on("SIGINT", () => {
  console.log("Received SIGINT. Closing pool...");
  pool.end((err) => {
    if (err) console.error(err);
    process.exit();
  });
});

app.listen(5000, () => {
  console.log("Expense app listening on port 5000!");
});
