import { STRING } from "sequelize";
import { sequelize } from "../db.connector";

const User = require('./user.model');
const Announcement = require('./announcement.model');

const Comment = sequelize.define('comments', {
    content: {
        type: STRING,
        allowNull: false
    }
});

User.hasMany(Comment);
Comment.belongsTo(User);
Announcement.hasMany(Comment);
Comment.belongsTo(Announcement);

module.exports = Comment;