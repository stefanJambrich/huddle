import { INTEGER } from "sequelize";
import { sequelize } from "../db.connector";

const UserGroup = sequelize.define('user_group', {});

module.exports = UserGroup;