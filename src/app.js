require('dotenv').config()
require('./db')
const express = require('express')
const app = express()

const cors = require('cors')
// const apiRoutes = require('./routes/api.routes')
// const Note = require('./models/note')
const PORT = process.env.PORT

app.use(cors())
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(apiRoutes)
app.get('/api/v1', (req, res) => {
	res.status(200).end()
})

app.use((req, res) => {
	res.status(404).end()
})

const server = app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})

module.exports = { app, server }