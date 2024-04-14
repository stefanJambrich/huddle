import { Request, Response } from "express";

const Comment = require('../model/comment.model');

export const getComments = async (req: Request, res: Response) => {
    const { announcementId } = req.body;
    if(!announcementId) return res.status(400).send('Missing body');

    try {
        const comments = await Comment.findAll({ where: { announcementId: announcementId } });
        res.status(200).send(comments);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const createComment = async (req: Request, res: Response) => {
    const { userId, content, announcementId } = req.body;
    if(!content || !announcementId) return res.status(400).send('Missing body');

    try {
        const comment = await Comment.create({ content, announcementId, userId });
        res.status(201).send(comment);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const updateComment = async (req: Request, res: Response) => {
    const { id, content } = req.body;
    if(!id || !content) return res.status(400).send('Missing body');

    try {
        const comment = await Comment.findOne({ where: { id: id } });
        if (!comment) return res.status(404).send('Comment does not exist');

        if (content) comment.content = content;

        await comment.save();
        res.status(200).send(comment);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    const { commentId, userId } = req.body;
    if(!commentId || !userId) return res.status(400).send('Missing body');

    try {
        const comment = await Comment.findOne({ where: { id: commentId } });
        if (!comment) return res.status(404).send('Comment does not exist');
        if (comment.userId !== userId) return res.status(400).send('User is not the owner of the comment');

        await Comment.destroy({ where: { id: commentId } });
        res.status(200).send('Comment deleted');
    } catch (error: any) {
        res.status(500).send({ message: error.message });
    }
}