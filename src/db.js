// const uri = process.env.MONGO_URI
const { MONGO_URI } = process.env
const uri = MONGO_URI
const mongoose = require('mongoose')

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log('connected to db'))

process.on('uncaughtException', () => {
	mongoose.connection.disconnect()
})