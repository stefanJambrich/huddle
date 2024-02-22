import { Request, Response } from "express";

const User = require('../model/user.model');
const Group = require('../model/group.model');

export const getGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const group = await Group.findOne({ where: { id: id } });
        res.status(200).send(group);
    } catch (error: any) {
        res.status(404).send({ message: error.message });
    }
}

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

export const createGroup = async (req: Request, res: Response) => {
    const { name } = req.body;
    if(!name) return res.status(400).send('Missing body');

    try {
        const group = await Group.create({ name });
        res.status(201).send(group);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}

export const addGroupToUser = async (req: Request, res: Response) => {
    const { userId, groupId } = req.body;
    if(!userId || !groupId) return res.status(400).send('Missing body');

    try {
        const user  = await User.findOne({ where: { id: userId } });
        const group = await Group.findOne({ where: { id: groupId } });

        user.addUser(group);
        res.status(200).send();
    } catch (error: any) {
        res.status(404).send({ message: error.message });
    }
}