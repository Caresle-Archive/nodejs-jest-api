const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
	name: String,
	completed: Boolean
})

noteSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id,
		delete ret._id,
		delete ret.__v
	}
})

module.exports = model('Note', noteSchema)