const { Model } = require('app/modules/common')

class NotesModel extends Model {
  schema() {
    return {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      user: {
        type: String,
        ref: 'User',
        required: true,
        index: true
      }
    }
  }
}

module.exports = NotesModel
