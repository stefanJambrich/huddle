import { Request, Response } from "express";
import { IUser } from "../type/user.type";

const User = require('../model/user.model');
const Group = require('../model/group.model');
const UserGroup = require('../model/userGroup.model');

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const user = await User.findOne({ where: { id: id }, include: Group});
        res.status(200).send(user);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}