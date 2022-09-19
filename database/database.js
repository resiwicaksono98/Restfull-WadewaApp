import { Sequelize } from "sequelize";

const db = new Sequelize('db_wadewa', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
})

export default db