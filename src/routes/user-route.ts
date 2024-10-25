import express, { Request, Response } from "express";
import { findUserById, getUserById, loginUser, registerUser } from "../controllers/user-controller";

const userRoutes = express.Router();

userRoutes.post('/register', (req: Request, res: Response) => {
    registerUser(req, res).catch(err => res.status(500).send(err.message));
});

userRoutes.post('/login', (req: Request, res: Response) => {
    loginUser(req, res).catch(err => res.status(500).send(err.message));
});

userRoutes.get('/:id', (req: Request, res: Response) => {
    findUserById(req, res).catch(err => res.status(500).send(err.message));
});

userRoutes.post('/', (req: Request, res: Response) => {
    getUserById(req, res).catch(err => res.status(500).send(err.message));
});

export default userRoutes