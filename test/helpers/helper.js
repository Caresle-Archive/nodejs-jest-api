const Note = require('../../src/models/note')

const notes = [
	{
		name: 'Note 1',
		completed: true
	}, 
	{
		name: 'Note 2',
		completed: false
	}, 
	{
		name: 'Note 3',
		completed: false
	}
]

const getNotes =  async () => {
	const data = await Note.find({})
	return data
}

module.exports = { notes, getNotes }