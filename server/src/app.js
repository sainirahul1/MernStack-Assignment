const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/api/auth", authRoutes);
const eventRoutes = require("./routes/event.routes");

app.use("/api/events", eventRoutes);


module.exports = app;
const authMiddleware = require("./middleware/auth.middleware");

app.get("/middleware-test", authMiddleware, (req, res) => {
  res.json({
    message: "Middleware working",
    userId: req.user.id
  });
});
