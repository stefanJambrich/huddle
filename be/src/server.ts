import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from './middleware/auth.middleware';

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
const announcementRoute = require('./route/announcement.route');
const commentRoute = require('./route/comment.route');
const authRoute = require('./route/auth.route');

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', auth, userRoute);
app.use('/api/v1/group', auth, groupRoute);
app.use('/api/v1/inviteCode', auth, inviteCodeRoute);
app.use('/api/v1/announcement', auth, announcementRoute);
app.use('/api/v1/comment', auth, commentRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
