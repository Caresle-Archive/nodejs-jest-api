const Note = require('../models/note')
const ObjectId = require('mongoose').Types.ObjectId


// Check if the given value is any of empty string
// null o undefined value
// Return true if is correct
const isCorrect = val => {
	if (val === '' || val === null || val === undefined) {
		return true
	}
}

const validId = id => {
	if (ObjectId.isValid(id)) {
		if (String(new ObjectId(id)) === id) {
			return true
		} else {
			return false
		}
	}
}

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

const deleteNote = async (req, res) => {
	const { id } = req.params

	if (validId(id)) {
		const response = await Note.findOneAndDelete({ id: id })
		console.log(response)
		if (response) {
			res.status(204).end()
		} else {
			res.status(404).end()
		}
	}
	res.status(400).end()
}

const updateNote = async (req, res) => {
	const id = req.params.id
	const { name, completed } = req.body
	let newObject = {}
	if (!isCorrect(name)) {
		newObject.name = name
	}
	if (!isCorrect(completed)) {
		newObject.completed = completed
	}
	if (Object.entries(newObject).length > 0) {
		const response = await Note.findOneAndUpdate({id: id}, newObject, { new: true })
		res.status(200).json(response).end()
	} else {
		res.status(204).end()
	}
}

module.exports = {
	getAllNotes,
	getNoteById,
	createNote,
	deleteNote,
	updateNote
}