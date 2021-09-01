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

describe('POST', () => {
	test('A valid note', async () => {
		await api
			.post('/api/v1')
			.send({
				name: 'Note post',
				completed: false
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /application\/json/)
			.expect(201)
	})

	test('Invalid name to note', async () => {
		await api
			.post('/api/v1')
			.send({
				name: null,
				completed: false
			})
			.set('Accept', 'application/json')
			.expect(400)
	})

	test('Note without name', async () => {
		await api
			.post('/api/v1')
			.send({
				completed: false
			})
			.set('Accept', 'application/json')
			.expect(400)
	})

	test('Valid name but no completed element', async () => {
		await api
			.post('/api/v1')
			.send({
				name: 'Note without completed'
			})
			.set('Accept', 'application/json')
			.expect(400)
	})

	test('Empty object', async () => {
		await api
			.post('/api/v1')
			.send({})
			.set('Accept', 'application/json')
			.expect(400)
	})
})

describe('DELETE', () => {
	test('Element by id', async () => {
		const data = await getNotes()
		const id = data[0].id
		await api
			.delete(`/api/v1/${id}`)
			.expect(204)
	})

	test('Bad id pass', async () => {
		await api
			.delete('/api/v1/1v2v3')
			.expect(400)
	})

	test('No id pass', async () => {
		await api
			.delete('/api/v1/')
			.expect(404)
	})
})

describe('PUT', () => {
	test('Update name', async () => {
		const data = await getNotes()
		const id = data[0].id
		await api
			.put(`/api/v1/${id}`)
			.send({
				name: 'Note update'
			})
			.expect('Content-Type', /application\/json/)
			.expect(200)
	})

	test('Update completed', async () => {
		const data = await getNotes()
		const id = data[0].id
		await api
			.put(`/api/v1/${id}`)
			.send({
				completed: true
			})
			.expect('Content-Type', /application\/json/)
			.expect(200)
	})

	test('Empty object', async () => {
		const data = await getNotes()
		const id = data[0].id
		await api
			.put(`/api/v1/${id}`)
			.send({})
			.expect(204)
	})

	test('No id', async () => {
		await api
			.put('/api/v1/')
			.send({})
			.expect(404)
	})
})

afterAll(async () => {
	const client = mongoose.connection.getClient()
	await client.close()
	server.close()
})