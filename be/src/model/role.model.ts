import { INTEGER, STRING } from "sequelize";
import { sequelize } from "../db.connector";

//ID: 1, Name: ADMIN
//ID: 2, Name: MEMBER
const Role = sequelize.define('roles', {
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: STRING
});

module.exports = Role;