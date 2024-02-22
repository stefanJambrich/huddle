import { INTEGER, Model, Optional, STRING } from "sequelize";
import { sequelize } from "../db.connector";

const InviteCode = require('./invite_code.model');

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
InviteCode.hasOne(Group);

module.exports = Group;