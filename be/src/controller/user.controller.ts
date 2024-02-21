import { Request, Response } from "express";
import { User as IUser } from "../type/user.type";
import { User } from "../model/user.model";

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const user = await User.findOne({ where: { id: 1 } });
        res.status(200).send(user);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}