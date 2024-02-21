import { Request, Response } from "express";
import { User } from "../model/user.model";
import { Group } from "../model/group.model";
import { UserGroup } from "../model/userGroup.model";

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    const newUser = await User.create({
        id: 1,
        firstname: 'John',
        surname: 'Doe',
        email: 'test@test.com',
        password: '123456',
        role: 'admin',
    });

    const newGroup = await Group.create({
        id: 1,
        name: 'testGroup'
    });

    await UserGroup.create({
        userId: newUser.id,
        groupId: 1
    });

    try {
        const user = await User.findOne({ where: { id: id } });
        res.status(200).send(user);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}