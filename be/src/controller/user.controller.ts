import { Request, Response } from "express";

const User = require('../model/user.model');
const Group = require('../model/group.model');
const UserGroup = require('../model/userGroup.model');

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const user = await User.findOne({ where: { id: id }, include: Group});
        if (!user) return res.status(404).send('User does not exist');
        res.status(200).send(user);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { firstname, surname, email, password } = req.body;
    if(!firstname || !surname || !email || !password) return res.status(400).send('Missing body');

    try {
        const user = await User.create({ firstname, surname, email, password });
        res.status(201).send(user);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id, firstname, surname, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { id: id } });
        if (firstname) user.firstname = firstname;
        if (surname) user.surname = surname;
        if (email) user.email = email;
        if (password) user.password = password;
        await user.save();
        res.status(200).send(user);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const updateUserRole = async (req: Request, res: Response) => {
    console.log("test")
    const { userId, changerId, groupId, roleId } = req.body;
    if(!userId || !changerId || !groupId || !roleId) return res.status(400).send('Missing body');

    try {
        const changer = await User.findOne({ where: { id: changerId } });
        if (!changer) return res.status(400).send('Changer does not exist');
        
        const changeRole = await UserGroup.findOne({ where: { userId: changerId, groupId: groupId } });
        if (!changeRole || changeRole.roleId !== 1) return res.status(400).send('Changer is not an admin or does not have permission to change role');

        const userGroup = await UserGroup.findOne({ where: { userId: userId, groupId: groupId } });
        if (!userGroup) return res.status(400).send('User is not in the group');
        console.log(userGroup);
        userGroup.roleId = roleId;
        await userGroup.save();
        
        res.status(200).send(userGroup);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.body.userId !== id) return res.status(400).send('The user does not have permission to delete this user');

    try {
        await User.destroy({ where: { id: id } });
        res.status(204).send("User deleted");
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}