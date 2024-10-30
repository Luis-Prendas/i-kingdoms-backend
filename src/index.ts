import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import attributeRouter from "./routes/attribute/attribute";
import skillRouter from "./routes/skill/skill";
import raceRouter from "./routes/race/race";
import classRouter from "./routes/class/class";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/attribute', attributeRouter);
app.use('/api/skill', skillRouter);
app.use('/api/race', raceRouter);
app.use('/api/class', classRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});