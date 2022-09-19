import express from 'express'
import { dbPort, secretKey } from './app/config.js';
import cors from 'cors'
import morgan  from 'morgan';
import session from 'express-session'
import sequelizeStore from 'connect-session-sequelize'
import bodyParser from 'body-parser'
import db from './database/database.js'
import authRoute from './app/auth/authRoute.js'
import letterRoute from './app/letters/letterRoute.js'


const app = express();

// (async () => {
// 	await db.sync()
// })();

const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
	db: db
});

app.use(session({
	secret: secretKey,
	resave: false,
	saveUninitialized: true,
	store: store,
	cookie: {
		secure: 'auto',
		maxAge: 1000 * 60 * 60 * 24 * 1 // 1 Day
	}
}))


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(express.static('public'))

app.use('/api', authRoute )
app.use('/api',  letterRoute)


app.listen(dbPort, () => console.log('Server is running port 5000'))