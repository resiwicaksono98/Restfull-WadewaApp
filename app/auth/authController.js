import Admin from "../admin/adminModel.js";
import Citizen from "../citizen/citizenModel.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
	try {
		const payload = req.body
		const hashPassword = payload.password && payload.password !== '' ? bcrypt.hashSync(payload.password, 10) : '';
		const user = await Citizen.create({ ...payload, password: hashPassword })
		return res.status(200).json({ msg: 'Register Account Success', data: user })
	} catch (error) {
		return res.status(400).json({ msg: error.message })
	}
}

export const registerAdmin = async (req, res) => {
	try {
		const payload = req.body
		const hashPassword = payload.password && payload.password !== '' ? bcrypt.hashSync(payload.password, 10) : '';
		const user = await Admin.create({ ...payload, password: hashPassword })
		return res.status(200).json({ msg: 'Register Account Success', data: user })
	} catch (error) {
		return res.status(400).json({ msg: error.message })
	}
}

export const loginUser = async (req, res) => {
	try {
		let user = await Citizen.findOne({ where: { email: req.body.email } })
		if (!user) return res.status(404).json({ msg: 'Acoount not found' })
		const match = bcrypt.compare(req.body.password, user.password)
		if (!match) return res.status(400).json({ msg: 'Wrong Password' })
		req.session.citizenId = user.citizenId
		const { name, nik, email } = user
		res.status(200).json({ msg: 'Success Login', data: { name, nik, email } })

	} catch (error) {
		return res.status(400).json({ msg: error.message })
	}
}

export const loginAdmin = async (req, res) => {
	try {
		let user = await Admin.findOne({ where: { email: req.body.email } })
		if (!user) return res.status(404).json({ msg: 'Acoount not found' })
		const match = bcrypt.compare(req.body.password, user.password)
		if (!match) return res.status(400).json({ msg: 'Wrong Password' })
		req.session.adminId = user.adminId
		const { name, email } = user
		res.status(200).json({ msg: 'Success Login', data: { name, email } })

	} catch (error) {
		return res.status(400).json({ msg: error.message })
	}
}

export const me = async (req, res) => {
	if (!req.session.citizenId) {
		return res.status(401).json({ msg: 'Please Login Your Account' })
	}
	const user = await Citizen.findOne({
		attributes: ['name', 'nik', 'email'],
		where: {
			citizenId: req.session.citizenId
		}
	});
	if (!user) return res.status(404).json({ msg: "User Not Found" })
	res.status(200).json(user)
}

export const logoutUser = async (req, res) => {
	req.session.citizenId = null
	res.status(200).json({ msg: "You Are Logout" })
}
export const logoutAdmin = async (req, res) => {
	req.session.adminId = null
	res.status(200).json({ msg: "You Are Logout" })
}