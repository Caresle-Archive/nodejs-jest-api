const { Router } = require('express')
const routes = Router()

const { getAllNotes } = require('../controllers/api.controller')

routes.get('/api/v1', getAllNotes)

module.exports = routes