import { INTEGER, STRING } from "sequelize";
import { sequelize } from "../db.connector";

const Group = require('./group.model');
const UserGroup = require('./userGroup.model');

export const User = sequelize.define('users', {
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: STRING,
    surname: STRING,
    email: STRING,
    password: STRING,
    role: STRING
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

module.exports = User;