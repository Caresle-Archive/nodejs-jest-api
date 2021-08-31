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

// Check if the given value is any of empty string
// null o undefined value
// Return true if is correct
const isCorrect = val => {
	if (val === '' || val === null || val === undefined) {
		return true
	}
}

const createNote = async (req, res, next) => {
	const { name, completed } = req.body
	if (isCorrect(name)) {
		res.status(400).end()
		return next()
	}

	if (isCorrect(completed)) {
		res.status(400).end()
		return next()
	}
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