import { Sequelize } from "sequelize";
import db from "../../database/database.js";

const { DataTypes } = Sequelize;

const Admin = db.define('admins', {
	adminId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: {
			args: true,
			msg: 'email already used'
		},
		validate: {
			isEmail: { msg: 'must be valid email address' }
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	freezeTableName: true
});

export default Admin