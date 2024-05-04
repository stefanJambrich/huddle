import express  from "express";
import { addUserToGroup, createGroup, getGroup, getGroups } from "../controller/group.controller";
const router = express.Router();

router.get('/find/:id', getGroup);
router.get('/all', getGroups);
router.post('/', createGroup);
router.put('/addUser', addUserToGroup);

module.exports = router;