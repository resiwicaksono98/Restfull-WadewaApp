import { Sequelize } from "sequelize";
import db from "../../database/database.js";
import Admin from "./adminModel.js";

const { DataTypes } = Sequelize;

const News = db.define(
  "newst",
  {
    newsId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    adminId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "title already exist",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_news: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

// Relation to Admin
Admin.hasMany(News, { foreignKey: "adminId", as: "news" });
News.belongsTo(Admin, { foreignKey: "adminId", as: "admin" });

export default News;
