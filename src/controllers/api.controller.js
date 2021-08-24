const Note = require('../models/note')

const getAllNotes = async (req, res) => {
	const response = await Note.find()
	res.json(response)
}

module.exports = {
	getAllNotes
}