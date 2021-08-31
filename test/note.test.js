const { beforeEach } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../src/app')

const Note = require('../src/models/note')

const api = supertest(app)

// helpers
const { notes, getNotes } = require('./helpers/helper')

beforeEach(async () => {
	await Note.deleteMany({})
	for(const note of notes) {
		const newNote = new Note(note)
		await newNote.save()
	}
})

describe('GET', () => {

	test('All notes', async () => {
		const response = await api.get('/api/v1')
		expect(response.body.length).toBe(notes.length)
	})

	test('By id', async () => {
		const data = await getNotes()
		const id = data[0].id
		const response = await api.get(`/api/v1/${id}`)
		expect(response.status).toBe(302)
	})

	test('Bad id', async () => {
		const response = await api.get('/api/v1/aav')
		expect(response.status).toBe(400)
	})

	test('Not found by id', async () => {
		await api
			.get('/api/v1/612d6487cef08f20712caba0')
			.expect(404)
	})
})



afterAll(async () => {
	const client = mongoose.connection.getClient()
	await client.close()
	server.close()
})