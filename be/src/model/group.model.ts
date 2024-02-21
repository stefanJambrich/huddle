import { INTEGER, Model, Optional, STRING } from "sequelize";
import { sequelize } from "../db.connector";

const Group = sequelize.define('groups', {
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: STRING
});

module.exports = Group;