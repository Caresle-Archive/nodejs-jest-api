require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
const apiRoutes = require('./routes/api.routes')

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(apiRoutes)

app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`)
})