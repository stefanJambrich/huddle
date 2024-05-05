import { Request, Response } from "express";

const User = require('../model/user.model');
const Group = require('../model/group.model');
const InviteCode = require('../model/inviteCode.model');
const UserGroup = require('../model/userGroup.model');

export const getGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Missing body');

    try {
        const group = await Group.findOne({ where: { id: id }, include: User});
        const userGroup = await UserGroup.findOne({ where: { userId: req.body.userId, groupId: id } });
        const role = userGroup.dataValues.roleId === 1 ? "ADMIN" : "MEMBER";

        res.status(200).send({group, role, userId: req.body.userId});
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const getGroups = async (req: Request, res: Response) => {
    const { userId } = req.body;
    if(!userId) return res.status(400).send('Missing body');

    try {
        const user = await User.findOne({ where: { id: userId }, include: Group});
        res.status(200).send(user.groups);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const createGroup = async (req: Request, res: Response) => {
    const { name, userId } = req.body;
    if(!name || !userId) return res.status(400).send('Missing body');

    try {
        const user  = await User.findOne({ where: { id: userId } });
        if (!user) return res.status(400).send('User does not exist');
        const group = await Group.create({ name });
        await group.addUser(user);

        const userGroup = await UserGroup.findOne({ where: { userId: userId, groupId: group.id } });
        userGroup.roleId = 1;
        await userGroup.save();

        res.status(201).send(group);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const addUserToGroup = async (req: Request, res: Response) => {
    const { userId, inviteCode } = req.body;
    if(!userId || !inviteCode) return res.status(400).send('Missing body');

    try {
        const groupInviteCodeExists = await InviteCode.findOne({where: { code: inviteCode }})
        if (!groupInviteCodeExists) return res.status(400).send('Invalid invite code');

        const groupId = groupInviteCodeExists.groupId;

        const userInGroup = await UserGroup.findOne({where: { groupId: groupId, userId: userId }});
        if (userInGroup) return res.status(400).send('User is already in the group');

        const user  = await User.findOne({ where: { id: userId } });
        const group = await Group.findOne({ where: { id: groupId } });
        if (!user || !group) return res.status(400).send('User or group does not exist');

        await group.addUser(user);
        const userGroup = await UserGroup.findOne({ where: { userId: userId, groupId: groupId } });
        userGroup.roleId = 2;
        await userGroup.save();

        const invite = await InviteCode.findOne({ where: { code: inviteCode } });
        
        invite.used = true;
        await invite.save();

        res.status(200).send("User added to group");
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const kickUserFromGroup = async (req: Request, res: Response) => {
    const { userId, groupId, userToKickId } = req.body;
    if(!userId || !groupId || !userToKickId) return res.status(400).send('Missing body');

    try {
        const userGroup = await UserGroup.findOne({ where: { userId: userId, groupId: groupId } });
        if (userGroup.roleId !== 1) return res.status(400).send('User is not an admin');

        const userInGroup = await UserGroup.findOne({ where: { userId: userToKickId, groupId: groupId } });
        if (!userInGroup) return res.status(400).send('User is not in the group');

        await UserGroup.destroy({ where: { userId: userToKickId, groupId: groupId } });

        res.status(204).send();
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteGroup = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const { id } = req.params;
    if(!userId || !id) return res.status(400).send('Missing body');

    try {
        const userGroup = await UserGroup.findOne({ where: { userId: userId, groupId: id } });
        if (userGroup.roleId !== 1) return res.status(400).send('User is not an admin or is not in group');

        await Group.destroy({ where: { id: id } });

        res.status(204).send();
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}