import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const createToken = (_id: string) => {
    const jwtkey = process.env.JWT_SECRET_KEY || "147258369"
    return jwt.sign({ _id }, jwtkey, { expiresIn: '1d' })
}

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password } = req.body

        // Validaciones
        const userAlReadyExists = await prisma.user.findFirst({ where: { email } })
        if (userAlReadyExists) return res.status(400).json({ message: "User already exists", success: false, response: null })
        if (!name || !email || !password) return res.status(400).json({ message: "Missing required fields", success: false, response: null })
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email", success: false, response: null })

        // Crear usuario y encriptar contraseña
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await prisma.user.create({ data: { name, email, password: hashedPassword }, select: { id: true, name: true, email: true } })

        // Generar token JWT
        const token = createToken(user.id.toString())

        // Enviar respuesta con el usuario registrado y el token
        return res.status(201).json({ message: "User registered successfully", success: true, response: { id: user.id, name: user.name, email: user.email, token } })
    } catch (error) {
        console.error('ERROR!', error)
        return res.status(400).json({ message: "Something went wrong | Register user", success: false, response: null })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body

        // Validaciones
        if (!email || !password) return res.status(400).json({ message: "Missing required fields", success: false, response: null })
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid credentials", success: false, response: null })

        // Buscar usuario
        const user = await prisma.user.findFirst({ where: { email } })
        if (!user) return res.status(400).json({ message: "Invalid credentials", success: false, response: null })

        // Verificar contraseña
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials", success: false, response: null })

        // Generar token JWT
        const token = createToken(user.id.toString())

        // Enviar respuesta
        return res.status(200).json({ message: "User logged in successfully", success: true, response: { user, token } })
    } catch (error) {
        console.log('ERROR!', error)
        return res.status(400).json({ message: "Something went wrong | Login user", success: false, response: null })
    }
}

export const findUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params

        // Validaciones
        if (!id) return res.status(400).json({ message: "Missing required fields", success: false, response: null })

        // Buscar usuario
        const user = await prisma.user.findFirst({ where: { id }, select: { id: true, name: true, email: true } })
        if (!user) return res.status(400).json({ message: "User not found", success: false, response: null })

        // Enviar respuesta
        return res.status(200).json({ message: "User found", success: true, response: user })
    } catch (error) {
        console.log('ERROR!', error)
        return res.status(400).json({ message: "Something went wrong | Find user by id", success: false, response: null })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.body

        // Validaciones
        if (!id) return res.status(400).json({ message: "Missing required fields", success: false, response: null })

        // Buscar usuario
        const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true } })
        if (!user) return res.status(400).json({ message: "User not found", success: false, response: null })

        // Enviar respuesta
        return res.status(200).json({ message: "User found", success: true, response: user })
    } catch (error) {
        console.log('ERROR!', error)
        return res.status(400).json({ message: "Something went wrong | Get user by id", success: false, response: null })
    }
}