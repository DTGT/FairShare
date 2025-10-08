import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // parse JSON requests

// API Routes
import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import expensesRoutes from "./routes/expensesRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expensesRoutes);


app.get("/", (req, res) => {
  res.send("FairShare API is running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));