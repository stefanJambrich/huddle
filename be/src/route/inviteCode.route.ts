import express  from "express";
import { deleteInviteCode, generateInviteCode, getUnusedInviteCode } from "../controller/inviteCode.controller";
const router = express.Router();

router.post('/:goupId', getUnusedInviteCode);
router.get('/generate/:groupId', generateInviteCode);

//Used only for debugging, if you need to have a way to delete invite codes, uncomment the route below
router.delete('/:id', deleteInviteCode);

module.exports = router;