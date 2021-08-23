const mongoose = require('mongoose')

const uri = process.env.MONGO_URI

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
	console.log('connected to db')
})