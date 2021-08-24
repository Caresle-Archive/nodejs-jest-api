jest.useFakeTimers()

const mongoose = require('mongoose')
const request = require('supertest')
const { app, server } = require('../app')

const api = request(app)

describe('GET /api/v1/', () => {
	test('GET All Users', async () => {
		await api
			.get('/api/v1/')
			.expect(404)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})