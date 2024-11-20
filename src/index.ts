import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import attributeRouter from "./routes/attribute/attribute";
import skillRouter from "./routes/skill/skill";
import raceRouter from "./routes/race/race";
import classRouter from "./routes/class/class";
import subClassRouter from "./routes/class/sub-class";
import classAttributeBonusRouter from "./routes/class/class-attribute-bonus";
import classSkillBonusRouter from "./routes/class/class-skill-bonus";
import subRaceRouter from "./routes/race/sub-race";
import raceAttributeBonusRouter from "./routes/race/race-attribute-bonus";
import raceSkillBonusRouter from "./routes/race/race-skill-bonus";
import sheetRouter from "./routes/sheet/sheet";
import sheetAttributeRouter from "./routes/sheet/sheet-attribute";
import sheetSkillRouter from "./routes/sheet/sheet-skill";
import sheetRaceRouter from "./routes/sheet/sheet-race";
import sheetClassRouter from "./routes/sheet/sheet-class";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/attribute', attributeRouter);
app.use('/api/skill', skillRouter);

app.use('/api/race', raceRouter);
app.use('/api/sub-race', subRaceRouter);
app.use('/api/race-attribute-bonus', raceAttributeBonusRouter);
app.use('/api/race-skill-bonus', raceSkillBonusRouter);

app.use('/api/class', classRouter);
app.use('/api/sub-class', subClassRouter);
app.use('/api/class-attribute-bonus', classAttributeBonusRouter);
app.use('/api/class-skill-bonus', classSkillBonusRouter);

app.use('/api/sheet', sheetRouter);
app.use('/api/sheet-attribute', sheetAttributeRouter);
app.use('/api/sheet-skill', sheetSkillRouter);
app.use('/api/sheet-race', sheetRaceRouter);
app.use('/api/sheet-class', sheetClassRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});