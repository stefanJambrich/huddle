import { BOOLEAN, STRING } from "sequelize";
import { sequelize } from "../db.connector";

const User = require('./user.model');
const Group = require('./group.model');

const Announcement = sequelize.define('announcements', {
    title: {
        type: STRING,
        allowNull: false
    },
    content: {
        type: STRING,
        allowNull: false
    }
});

User.hasMany(Announcement);
Announcement.belongsTo(User);
Group.hasMany(Announcement);
Announcement.belongsTo(Group);

module.exports = Announcement;