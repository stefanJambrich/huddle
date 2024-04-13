import { Request, Response } from "express";

const User = require('../model/user.model');
const Group = require('../model/group.model');

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const user = await User.findOne({ where: { id: id }, include: Group});
        res.status(200).send(user);
    } catch (error: any) {
        res.status(404).send({ message: error.message });
    }
}

export const getUsersGroups = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const user = await User.findOne({ where: { id: id }, include: Group});
        res.status(200).send(user);
    } catch (error: any) {
        res.status(404).send({ message: error.message });
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { firstname, surname, email, password } = req.body;
    if(!firstname || !surname || !email || !password) return res.status(400).send('Missing body');

    try {
        const user = await User.create({ firstname, surname, email, password });
        res.status(201).send(user);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstname, surname, email, password } = req.body;

    try {
        const user = await User.update({ firstname, surname, email, password }, { where: { id: id } });
        res.status(200).send(user);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await User.destroy({ where: { id: id } });
        res.status(204).send();
    } catch (error: any) {
        res.status(404).send({ message: error.message });
    }
}