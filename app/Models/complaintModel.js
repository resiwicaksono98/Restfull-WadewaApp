/** @format */

import { Sequelize } from "sequelize";
import db from "../../database/database.js";
import Citizen from "./citizenModel.js";
import Letters from "./lettersModel.js";

const { DataTypes } = Sequelize;

const Complaint = db.define(
   "complaints",
   {
      complaintId: {
         type: DataTypes.UUID,
         primaryKey: true,
         allowNull: false,
         defaultValue: DataTypes.UUIDV4,
      },
      citizenId: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      complaint_type: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
      },
      image_url: { type: DataTypes.STRING, allowNull: false },
   },
   {
      freezeTableName: true,
   }
);
// Relation citizen To Complaint
Citizen.hasMany(Complaint, {
   foreignKey: { name: "citizenId" },
   as: "complaints",
});
Complaint.belongsTo(Citizen, {
   foreignKey: { name: "citizenId" },
   as: "citizen",
});

// Relation complaint to letters
Letters.hasMany(Complaint, { foreignKey: "complaint_type", as: "complaints" });
Complaint.belongsTo(Letters, { foreignKey: "complaint_type", as: "letters" });

export default Complaint;
