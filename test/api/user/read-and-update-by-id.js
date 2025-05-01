let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('read-and-update-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with 401 as auth is not valid', async () => {
        await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .send({ firstName: 'new first name', lastName: 'new last name' })
          .expect(401)
          .promise()
      })

      it('should fail with 403 as auth and parameter dont match', async () => {
        await agent
          .client()
          .put(`/user/differentuser`)
          .set('authorization', globalAuth.token)
          .send({ firstName: 'new first name', lastName: 'new last name' })
          .expect(403)
          .promise()
      })

      it('should update with correct user', async () => {
        const updated = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .send({ firstName: 'new first name', lastName: 'new last name' })
          .expect(200)
          .promise()

        should.exist(updated)
        updated.firstName.should.equal('new first name')
        updated.lastName.should.equal('new last name')
        updated.id.should.equal(globalAuth.user)
      })
    })
  })
})
