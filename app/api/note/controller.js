const noteService = require('app/modules/notes')

/**
 * @method create
 */
exports.create = async (req, res) => {
  const note = await noteService.createForUser(req.userId, req.body)
  res.status(201).send(note)
}

/**
 * @method list
 */
exports.list = async (req, res) => {
  const notes = await noteService.findByUser(req.params.id)
  res.status(200).send(notes)
}
