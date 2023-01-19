/** @format */

import Citizen from "../app/Models/citizenModel.js";
import Admin from "../app/Models/adminModel.js";

export const verifyUserCitizen = async (req, res, next) => {
   try {
      if (!req.session.citizenId) return res.status(401).json({ msg: "Please Your Login Citizen" });
      const user = await Citizen.findOne({ where: { citizenId: req.session.citizenId } });
      if (!user) return res.status(404).json({ msg: "User not found" });
      req.userId = user.citizenId;
      next();
   } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};

export const adminOnly = async (req, res, next) => {
   console.log({ adminID: req.session });
   try {
      if (!req.session.adminId) return res.status(401).json({ msg: "Please Your Login Admin" });
      const admin = await Admin.findOne({ where: { adminId: req.session.adminId } });
      if (!admin) return res.status(404).json({ msg: "User not found" });
      req.adminId = admin.adminId;
      next();
   } catch (error) {
      res.status(500).json({ msg: error.message });
   }
};
