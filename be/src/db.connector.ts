import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    `${process.env.PGDATABASE}`,
    `${process.env.PGUSER}`,
    `${process.env.PGPASSWORD}`, {
        host: `${process.env.PGHOST}`,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    },
);

const User = require('./model/user.model');
const Group = require('./model/group.model');
const UserGroup = require('./model/userGroup.model');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('database connection successful');
    } catch (error) {
        console.log('database connection failed');
    }
})();

(async () => {
    await sequelize.sync();
    console.log('juch');
})();