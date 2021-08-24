const mongoose = require('mongoose')
jest.useFakeTimers()
jest.setTimeout(30000)

const request = require('supertest')
const { app, server } = require('../app')

const api = request(app)

describe('GET /api/v1/', () => {
	test('GET All Users', async () => {
		await api
			.get('/api/v1/')
			.expect(200)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})