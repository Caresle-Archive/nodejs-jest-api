const Note = require('../models/note')

beforeAll(async () => {
	await Note.deleteMany()
	
})

describe('GET /api/v1/', () => {
	test('GET ALL Users', () => {
		expect(1+1).toBe(2)
	})
})