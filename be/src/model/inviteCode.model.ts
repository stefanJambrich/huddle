import { BOOLEAN, INTEGER, STRING } from "sequelize";
import { sequelize } from "../db.connector";

const InviteCode = sequelize.define('invite_code', {
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    code: STRING,
    used: BOOLEAN
});

module.exports = InviteCode;