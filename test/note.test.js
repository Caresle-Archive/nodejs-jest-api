const { beforeEach } = require('@jest/globals')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { describe } = require('yargs')
const { app, server } = require('../src/app')

const Note = require('../src/models/note')

const api = supertest(app)

// helpers
const { notes } = require('./helpers/helper')

beforeEach(async () => {
	await Note.deleteMany({})
	for(const note of notes) {
		const newNote = new Note(note)
		await newNote.save()
	}
})

test('get', async () => {
	const response = await api.get('/api/v1')
	expect(response.body.length).toBe(notes.length)
})

test('get by id', async () => {
	const response = await api.get(`/api/v1/${0}`)
	expect(response.body).toBeInstanceOf(Object)
	expect(Object.entries(response.body).length).toBeGreaterThan(0)
})

afterAll(async () => {
	const client = mongoose.connection.getClient()
	await client.close()
	server.close()
})