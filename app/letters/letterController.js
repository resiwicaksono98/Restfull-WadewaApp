import Letters from "./lettersModel.js";

export const createLetter = async (req, res) => {
	try {
		const payload = req.body
		const letter = await Letters.create(payload)
		return res.status(200).json({ msg: 'Create Latter', data: letter })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const getLetter = async (req, res) => {
	try {
		const letter = await Letters.findAll()
		return res.status(200).json({ msg: 'All Latter', data: letter })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const getLatterById = async (req, res) => {
	try {
		const letter = await Letters.findOne({ where: { lettersId: req.params.lettersId } })
		return res.status(200).json({ msg: `Get Data ${letter.title}`, data: letter })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const updateLetter = async (req, res) => {
	try {
		const payload = req.body
		const latter = await Letters.update(payload, { where: { lettersId: req.params.lettersId } })
		return res.status(200).json({ msg: 'Update Data', data: latter })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const destroyLetter = async (req, res) => {
	try {
		const letter = await Letters.destroy({ where: { lettersId: req.params.lettersId } })
		return res.status(200).json({ msg: 'Success Delete', data: letter })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}