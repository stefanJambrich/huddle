import { Request, Response } from "express";
import { randomUUID } from "crypto";

const InviteCode = require('../model/inviteCode.model');
const Group = require('../model/group.model');

export const getUnusedInviteCode = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    if(!groupId) return res.status(400).send('Missing body');

    try {
        const groupInviteCodeExists = await Group.findOne({
            where: { id: groupId },
            include: [{
                model: InviteCode,
                where: { used: true }
            }]
        });
        res.status(200).send(groupInviteCodeExists);
    } catch (error: any) {
        res.status(404).send({ message: error.message });
    }
}

export const generateInviteCode = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    if(!groupId) return res.status(400).send('Missing body');

    try {
        const groupExists = await Group.findOne({ where: { id: groupId } });
        if (!groupExists) return res.status(400).send('Group does not exist');

        const groupInviteCodeExists = await InviteCode.findOne({where: { groupId: groupId, used: false }})
        if (groupInviteCodeExists) return res.status(400).send(groupInviteCodeExists);

        const inviteCode = await InviteCode.create({ code: randomUUID(), used: false, groupId: groupId});
        return res.status(201).send(inviteCode);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteInviteCode = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await InviteCode.destroy({ where: { id: id } });
        res.status(204).send();
    } catch (error: any) {
        res.status(404).send({ message: error.message });
    }
}