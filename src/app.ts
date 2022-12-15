import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as path from 'path';
import { api } from './api';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>hello world!</h1>');
});

app.use('/api', api);

export { app };
