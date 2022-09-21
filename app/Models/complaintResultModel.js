import { Sequelize } from "sequelize";
import db from "../../database/database.js";
import Citizen from "./citizenModel.js";
import Complaint from "./complaintModel.js";
import Letters from "./lettersModel.js";


const { DataTypes } = Sequelize

const ComplaintResult = db.define('complaintResult', {
	complaintResultId: {
		type: DataTypes.UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4
	},
	complaintId: { type: DataTypes.STRING, allowNull: false },
	adminId: { type: DataTypes.STRING },
	citizenId: { type: DataTypes.STRING },
	letterId: { type: DataTypes.STRING },
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending'
	},
	message: { type: DataTypes.TEXT },
	files: { type: DataTypes.STRING }
}, {
	freezeTableName: true
})

// Relation to complaint
Complaint.hasOne(ComplaintResult, { foreignKey: 'complaintId', as: 'complaintResult' })
ComplaintResult.belongsTo(Complaint, { foreignKey: 'complaintId', as: 'complaint' })

// Relation to citizen
Citizen.hasMany(ComplaintResult, { foreignKey: 'citizenId', as: 'complaintResult' })
ComplaintResult.belongsTo(Citizen, { foreignKey: 'citizenId', as: 'citizen' })

// Relation to
Letters.hasMany(ComplaintResult, { foreignKey: 'letterId', as: 'complaintResult' })
ComplaintResult.belongsTo(Letters, {foreignKey: 'letterId', as: 'letter'})

export default ComplaintResult