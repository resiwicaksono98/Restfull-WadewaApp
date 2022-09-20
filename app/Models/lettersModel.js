import { Sequelize } from "sequelize";
import db from "../../database/database.js";
const { DataTypes } = Sequelize;

const Letters = db.define('letters', {
	lettersId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: {
			args: true,
			msg: 'Title already used' 
		}
	},
	letter_number: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content_letter: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	village_address: { type: DataTypes.TEXT, allowNull: false},
	village_head: {type: DataTypes.STRING, allowNull: false},
	nip: {type: DataTypes.STRING, allowNull: false, validate: {isNumeric: {args: true, msg: 'Must be number'}}}
},{
	freezeTableName: true
} )

export default Letters