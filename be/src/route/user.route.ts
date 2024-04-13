import express  from "express";
import { createUser, deleteUser, getUserById, getUsersGroups, updateUser } from "../controller/user.controller";

const router = express.Router();

router.get('/:id', getUserById);
router.get('/groups', getUsersGroups);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;