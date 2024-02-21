import { INTEGER } from "sequelize";
import { sequelize } from "../db.connector";

export const UserGroup = sequelize.define('user_group', {
    userId: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    groupId: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'groups',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

module.exports = UserGroup;