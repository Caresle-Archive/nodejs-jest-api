const { Router } = require('express')
const routes = Router()

const { 
	getAllNotes,
	getNoteById,
	createNote,
	deleteNote,
	updateNote
} = require('../controllers/api.controller')

routes.get('/api/v1', getAllNotes)

routes.get('/api/v1/:id', getNoteById)

routes.post('/api/v1', createNote)

routes.delete('/api/v1/:id', deleteNote)

routes.put('/api/v1/:id', updateNote)

module.exports = routes