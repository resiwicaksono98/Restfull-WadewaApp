import Letters from "../../Models/lettersModel.js";



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
		const letter = await Letters.findOne({ where: { letterId: req.params.letterId } })
		return res.status(200).json({ msg: `Get Data ${letter.title}`, data: letter })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

