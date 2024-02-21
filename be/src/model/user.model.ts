import { ARRAY, BLOB, INTEGER, Model, Optional, STRING } from "sequelize";
import { sequelize } from "../db.connector";
import { User as IUser } from "../type/user.type";

export class User extends Model<IUser> {
    declare id: number;
    declare firstname: string;
    declare surname: string;
    declare email: string;
    declare password: string;
    declare role: string;
}

User.init({
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
    role: STRING
}, {
    sequelize,
    modelName: 'users'
});