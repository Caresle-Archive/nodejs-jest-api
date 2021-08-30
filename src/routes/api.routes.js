const { Router } = require('express')
const routes = Router()

const { 
	getAllNotes,
	getNoteById
} = require('../controllers/api.controller')

routes.get('/api/v1', getAllNotes)

routes.get('/api/v1/:id', getNoteById)

module.exports = routes