import { BOOLEAN, INTEGER, STRING } from "sequelize";
import { sequelize } from "../db.connector";

const InviteCode = sequelize.define('invite_code', {
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    groupId: INTEGER,
    code: STRING,
    used: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = InviteCode;