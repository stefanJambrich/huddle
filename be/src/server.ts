import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.static('public'));

const db = require('./db.connector');
const userRoute = require('./route/user.route');

app.use('/api/user', userRoute);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
