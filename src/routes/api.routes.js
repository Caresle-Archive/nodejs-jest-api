const { Router } = require('express')
const routes = Router()

const { getAllNotes } = require('../controllers/api.controller')

routes.get('/', getAllNotes)

module.exports = routes