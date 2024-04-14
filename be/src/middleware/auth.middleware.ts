import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.userId;
        next();
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}