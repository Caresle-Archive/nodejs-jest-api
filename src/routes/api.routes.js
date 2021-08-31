const { Router } = require('express')
const routes = Router()

const { 
	getAllNotes,
	getNoteById,
	createNote
} = require('../controllers/api.controller')

routes.get('/api/v1', getAllNotes)

routes.get('/api/v1/:id', getNoteById)

routes.post('/api/v1', createNote)

module.exports = routes