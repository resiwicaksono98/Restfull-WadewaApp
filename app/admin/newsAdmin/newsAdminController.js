import News from "../../Models/newsModel.js";
import fs from 'fs'
import Admin from "../../Models/adminModel.js";

export const createNewsAdmin = async (req, res) => {
	try {
		let payload = req.body
		payload = { ...payload, adminId: req.session.adminId }
		let news;
		if (req.file) {
			payload = { ...payload, image_news: 'images/newst/' + req.file.filename }
			news = await News.create(payload)
			return res.status(200).json({ msg: 'Create News', data: news })
		} else {
			news = await News.create(payload)
		}
		return res.status(200).json({ msg: 'Create News', data: news })

	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const getNewsAdmin = async (req, res) => {
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

export const getNewsAdminById = async (req, res) => {
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

export const updateNewsAdmin = async (req, res) => {
	try {
		const news = await News.findOne({ where: { newsId: req.params.newsId } })
		if (!news) return res.status(404).json({ msg: 'News not found' })
		let payload = req.body
		payload = { ...payload, adminId: req.session.adminId }
		let newsRes;
		if (req.file) {
			const imagePath = `public/${news.image_news}`
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath)
			}
			payload = { ...payload, image_news: 'images/newst/' + req.file.filename }
			newsRes = await News.update(payload, { where: { newsId: req.params.newsId } })
		} else {
			newsRes = await News.update(payload, { where: { newsId: req.params.newsId } })
		}
		return res.status(200).json({ msg: 'Update News', data: newsRes })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

export const destroyAdminNews = async (req, res) => {
	try {
		const news = await News.findOne({ where: { newsId: req.params.newsId } })
		if (!news) return res.status(404).json({ msg: 'News not found' })
		const imagePath = `public/${news.image_news}`
		if (fs.existsSync(imagePath)) {
			fs.unlinkSync(imagePath)
		}
		const newsRes = await News.destroy({ where: { newsId: req.params.newsId } })
		return res.status(200).json({ msg: 'Success Deleted News', data: newsRes })
	} catch (error) {
		return res.status(500).json({ msg: error.message })
	}
}

