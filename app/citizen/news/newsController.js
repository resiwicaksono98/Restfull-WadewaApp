import Admin from "../../Models/adminModel.js";
import News from "../../Models/newsModel.js";

export const getNews = async (req, res) => {
	try {
		const news = await News.findAll({
			include: [{
				model: Admin,
				as: 'admin',
				attributes: ['name', 'email']
			}]
		})
		return res.status(200).json({ msg: 'Get All Newst', data: news })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const getNewsById = async (req, res) => {
	try {
		const news = await News.findOne({
			where: { newsId: req.params.newsId },
			include: [{
				model: Admin,
				as: 'admin',
				attributes: ['name', 'email']
			}]
		})
		if (!news) return res.status(404).json({ msg: 'News not found' })
		return res.status(200).json({ msg: `Get News ${news.title}`, data: news })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}