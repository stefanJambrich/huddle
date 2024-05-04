import { Request, Response } from "express";

const Announcement = require('../model/announcement.model');
const Group = require('../model/group.model');
const Comment = require('../model/comment.model');

export const getAnnouncements = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    if(!groupId) return res.status(400).send('Missing body');

    try {
        const announcements = await Announcement.findAll({ where: { groupId: groupId }, include: Comment });
        res.status(200).send(announcements);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const createAnnouncement = async (req: Request, res: Response) => {
    const { userId, title, content, groupId } = req.body;
    if(!title || !content || !groupId) return res.status(400).send('Missing body');

    try {
        const group = await Group.findOne({ where: { id: groupId }, include: Announcement});
        if (!group) return res.status(404).send('Group does not exist');
        if (group.announcements.length >= group.maxAnnouncements) return res.status(400).send('Group does not allow any more announcements');

        const announcement = await Announcement.create({ title, content, groupId, userId });
        res.status(201).send(announcement);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const updateAnnouncement = async (req: Request, res: Response) => {
    const { id, title, content } = req.body;
    if(!id || !title || !content) return res.status(400).send('Missing body');

    try {
        const announcement = await Announcement.findOne({ where: { id: id } });
        if (!announcement) return res.status(404).send('Announcement does not exist');

        if (title) announcement.title = title;
        if (content) announcement.content = content;

        await announcement.save();
        res.status(200).send(announcement);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteAnnouncement = async (req: Request, res: Response) => {
    const { announcementId, userId, groupId } = req.body;
    if(!announcementId || !userId || !groupId) return res.status(400).send('Missing body');

    try {
        const announcement = await Announcement.findOne({ where: { id: announcementId } });
        if (!announcement) return res.status(404).send('Announcement does not exist');
        if (announcement.userId !== userId) return res.status(400).send('User is not the owner of the announcement');

        await Announcement.destroy({ where: { id: announcementId } });
        res.status(200).send('Announcement deleted');
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}