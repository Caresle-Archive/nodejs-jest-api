const Note = require('../models/note')

const getAllNotes = async (req, res) => {
	const response = await Note.find()
	res.json(response)
}

const getNoteById = async (req, res, next) => {
	let response
	try {
		response = await Note.findById(req.params.id)
	} catch(err) {
		console.log('Bad id')
		res.status(400).end()
		return next()
	}

	if (response === null) {
		res.status(404).end()
		return next()
	}

	res.status(302).json(response)
}

const createNote = async (req, res) => {
	const { name, completed } = req.body

	const response = await Note.create({
		name: name,
		completed: completed
	})
	res.status(201).json(response)
}

module.exports = {
	getAllNotes,
	getNoteById,
	createNote
}