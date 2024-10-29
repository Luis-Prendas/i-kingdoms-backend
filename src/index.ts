import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import attributeRouter from "./routes/attribute/attribute";
import skillRouter from "./routes/skill/skill";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/attribute', attributeRouter);
app.use('/api/skill', skillRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});