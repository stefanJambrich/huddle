import express  from "express";
import { createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from "../controller/announcement.controller";

const router = express.Router();

router.get('/', getAnnouncements);
router.post('/', createAnnouncement);
router.put('/', updateAnnouncement);
router.delete('/', deleteAnnouncement);

module.exports = router;