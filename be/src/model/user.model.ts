import { ARRAY, BLOB, INTEGER, STRING, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../db.connector";

const User = sequelize.define('user', {
    id: {
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: STRING(20),
    surname: STRING(20),
    email: STRING,
    password: STRING,
    role: STRING,
    profile_picture: ARRAY(BLOB),
});