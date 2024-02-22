import { Request, Response } from "express";

const User = require('../model/user.model');
const Group = require('../model/group.model');

export const getAllUsersFromGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const group = await Group.findOne({ where: { id: id }, include: User});
        res.status(200).send(group);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}