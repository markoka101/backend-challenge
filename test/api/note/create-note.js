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
    describe('create-note', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should create note fro user', async () => {
        const note = await agent
          .client()
          .post('/note')
          .set('authorization', globalAuth.token)
          .send({
            title: 'Test title',
            message: 'test message'
          })
          .expect(201)
          .promise()

        should.exist(note)
        note.title.should.equal('Test title')
        note.message.should.equal('test message')
        note.user.should.equal(globalAuth.user)
      })
    })
  })
})
