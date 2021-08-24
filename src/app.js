require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const apiRoutes = require('./routes/api.routes')

const PORT = process.env.PORT || 3001

require('./db')

app.use(cors())
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(apiRoutes)

app.use((req, res) => {
	res.status(404).end()
})

const server = app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})

module.exports = { app, server }