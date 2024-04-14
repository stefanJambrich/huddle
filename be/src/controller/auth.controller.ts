import { Request, Response } from "express";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user.model');

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).send('Missing body');

    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) return res.status(400).send('Invalid credentials');
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).send({ token });
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const register = async (req: Request, res: Response) => {
    const { firstname, surname, email, password } = req.body;
    if(!firstname || !surname || !email || !password) return res.status(400).send('Missing body');

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstname, surname, email, password: hashedPassword });
        res.status(201).send(user);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}