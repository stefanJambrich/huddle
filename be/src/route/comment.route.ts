import express  from "express";
import { getComments, createComment, updateComment, deleteComment } from "../controller/comment.controller";

const router = express.Router();

router.get('/', getComments);
router.post('/', createComment);
router.put('/', updateComment);
router.delete('/', deleteComment);

module.exports = router;