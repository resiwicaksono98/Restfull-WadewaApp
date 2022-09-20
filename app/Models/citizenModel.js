import { Sequelize } from "sequelize";
import db from "../../database/database.js";

const { DataTypes } = Sequelize;

const Citizen = db.define('citizens', {
	citizenId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	nik: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isNumeric: true,
			len: {
				args : [16,16],
				msg: 'Must be 16 digits'
			}
		}
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
	},
	address: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING
	}
}, {
	freezeTableName: true
});

export default Citizen