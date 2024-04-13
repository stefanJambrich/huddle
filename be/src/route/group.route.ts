import express  from "express";
import { addUserToGroup, createGroup, getGroup } from "../controller/group.controller";
const router = express.Router();

router.get('/:id', getGroup);
router.post('/', createGroup);
router.put('/addUser', addUserToGroup);

module.exports = router;