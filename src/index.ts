import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import attributeRoutes from "./routes/attibute";
import AppDataSource from "./data-source";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        app.use('/api/attribute', attributeRoutes);
        const port = process.env.PORT || 54321;
        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
            console.log(`API disponible en http://localhost:${port}/api/`)
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
