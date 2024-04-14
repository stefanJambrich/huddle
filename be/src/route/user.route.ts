import express  from "express";
import { deleteUser, getUserById, updateUserRole, updateUser } from "../controller/user.controller";

const router = express.Router();

router.get('/:id', getUserById);
//router.post('/', createUser);
router.put('/', updateUser);
router.put('/role', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;