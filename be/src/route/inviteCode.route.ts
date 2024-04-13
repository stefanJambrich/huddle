import express  from "express";
import { deleteInviteCode, generateInviteCode, getUnusedInviteCode } from "../controller/inviteCode.controller";
const router = express.Router();

router.get('/:goupId', getUnusedInviteCode);
router.post('/generate/:groupId', generateInviteCode);

//Used only for debugging, if you need to have a way to delete invite codes, uncomment the route below
router.delete('/:id', deleteInviteCode);

module.exports = router;