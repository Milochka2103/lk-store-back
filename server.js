import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from "bcrypt";
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleCreateNewJacket, handleGetBlazers } from './controllers/blazers.js';
import cookieParser from 'cookie-parser';


/* const DATABASE_URL = "postgres://lk_store_db_user:kQ1AtUB7zXS5O9PT7g6ZXy3TLTAyhslH@dpg-ckqir91rfc9c7390dfu0-a.oregon-postgres.render.com/lk_store_db"; */
/* const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
}); */
/* for local */
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    port: 5432,
    password: "melages332",
    database: "lk-store",
  },
});

const app = express();

app.use(cors());
app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
  res.send('it is working')
})

app.post('/signin', handleSignin(db, bcrypt))

app.post('/register', handleRegister(db, bcrypt))

app.post('/blazer', handleCreateNewJacket(db))


app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
  .catch(err => res.status(400).json("Error getting user"))
})


app.get('/blazers', handleGetBlazers(db))


app.listen(3000, () => {
  console.log('App is running on port 3000')
})