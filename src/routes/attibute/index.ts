import express, { Request, Response } from "express";
import { createAttribute, findAllAttributes } from "../../controllers/attribute";

const attributeRoutes = express.Router();

attributeRoutes.get('/all', (req: Request, res: Response) => {
  findAllAttributes(req, res).catch(err => res.status(500).send(err.message));
});

attributeRoutes.post('/create', (req: Request, res: Response) => {
  createAttribute(req, res).catch(err => res.status(500).send(err.message));
});

export default attributeRoutes