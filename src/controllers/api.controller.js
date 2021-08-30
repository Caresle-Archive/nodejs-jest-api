const Note = require('../models/note')

const getAllNotes = async (req, res) => {
	const response = await Note.find()
	res.json(response)
}

const getNoteById = async (req, res) => {
	const response = await Note.findById(req.params.id)
	res.json(response)
}

module.exports = {
	getAllNotes,
	getNoteById
}