import { INTEGER, Model, Optional, STRING } from "sequelize";
import { sequelize } from "../db.connector";

const InviteCode = require('./inviteCode.model');

const Group = sequelize.define('groups', {
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: STRING
});

Group.hasMany(InviteCode);
InviteCode.belongsTo(Group);

module.exports = Group;