const { validate, Validator } = require('app/api/common')
const { body } = validate
class NoteValidator extends Validator {
  async create(req) {
    const validations = [body('title').isLength(1, 128), body('message').isLength(1, 2048)]
    await this.validate(req, validations)
  }
}

module.exports = new NoteValidator()
