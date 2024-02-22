import express  from "express";
import { getAllUsersFromGroup } from "../controller/group.controller";

const router = express.Router();

router.get('/:id', getAllUsersFromGroup);

module.exports = router;