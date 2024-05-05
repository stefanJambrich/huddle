import express  from "express";
import { addUserToGroup, createGroup, deleteGroup, getGroup, getGroups, kickUserFromGroup } from "../controller/group.controller";
const router = express.Router();

router.get('/find/:id', getGroup);
router.get('/all', getGroups);
router.post('/', createGroup);
router.put('/addUser', addUserToGroup);
router.delete('/kick', kickUserFromGroup);
router.delete('/:id', deleteGroup);

module.exports = router;