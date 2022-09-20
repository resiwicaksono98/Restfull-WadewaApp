import { Sequelize } from "sequelize";
import db from "../../database/database.js";


const { DataTypes } = Sequelize

const ComplaintResult = db.define('complaint_result', {
	complaintResultId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	complaintId: { type: DataTypes.STRING, allowNull: false },
	adminId: { type: DataTypes.STRING },
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending'
	},
	message: { type: DataTypes.TEXT }
}, {
	freezeTableName: true
})

export default ComplaintResult