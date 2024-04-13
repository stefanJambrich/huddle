import { INTEGER } from "sequelize";
import { sequelize } from "../db.connector";

const UserGroup = sequelize.define('user_groups', {
    roleId: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 2
    }
});

module.exports = UserGroup;