import express  from "express";
import { getUserById } from "../controller/user.controller";

const router = express.Router();

router.get('/:id', getUserById);

module.exports = router;