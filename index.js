require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = require("./models/db");

sequelize
  .authenticate()
  .then(() => console.log("Neon Postgres connected "))
  .catch((err) =>
    console.error("Neon Postgres connection error:", err.message),
  );

const postRoutes = require("./routes/postRoutes");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Blog API" });
});

app.use("/api/articles", postRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
