import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "../server/routes/postRoutes.js";
import userRoutes from "../server/routes/userRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server successfully connected to the database on port ${PORT}`
      );
    });
  })
  .catch((err) => console.error("Error connecting to the database:", err));
