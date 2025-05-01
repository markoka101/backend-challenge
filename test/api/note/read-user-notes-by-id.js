let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('note', () => {
    describe('read-note-from-user', () => {
      let global
      let globalAuth
      let globalNote

      before(async () => {
        global = await mockData.mockUserAndNote()
        globalAuth = global.auth
        globalNote = global.note
      })

      it('should fail with 401 as auth not valid', async () => {
        await agent.client().get(`/user/${globalAuth.user}/notes`).expect(401).promise()
      })
      it('should fail with 403 as auth doest match path variable', async () => {
        await agent.client().get(`/user/diffuser/notes`).set('authorization', globalAuth.token).expect(403).promise()
      })

      it('should display notes for user', async () => {
        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(notes)
        notes[0].id.should.equal(globalNote.id)
      })
    })
  })
})
