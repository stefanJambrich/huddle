import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//.env configuration, can be set manually in db.connector.ts
/*
--Values for .env file--
PGHOST=''
PGDATABASE=''
PGUSER=''
PGPASSWORD=''
ENDPOINT_ID=''
PORT=
*/
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.static('public'));

const db = require('./db.connector');
const userRoute = require('./route/user.route');
const groupRoute = require('./route/group.route');
const inviteCodeRoute = require('./route/inviteCode.route');

app.use('/api/v1/user', userRoute);
app.use('/api/v1/group', groupRoute);
app.use('/api/v1/inviteCode', inviteCodeRoute);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
