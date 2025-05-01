const { Service } = require('app/modules/common')

class NoteService extends Service {
  /**
   *saves the note
   * @param {string} userId
   * @param {note} data
   * @returns {promise}
   */
  async createForUser(userId, data) {
    data.user = userId
    return this.model.create(data)
  }
  /**
   * returns notes for the user
   * @param {string} userId
   * @returns {promise}
   */
  async findByUser(userId) {
    return this.model.find({ user: userId })
  }
}
module.exports = NoteService
