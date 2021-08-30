const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../src/app')

const api = supertest(app)

test('get', async () => {
	await api.get('/api/v1').expect(200)
})

afterAll(() => {
	const client = mongoose.connection.getClient()
	client.close()
	server.close()
})