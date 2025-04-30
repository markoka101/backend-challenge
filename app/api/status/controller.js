const MongoDB = require('app/lib/mongodb.js')

exports.currentStatus = async function (req, res) {
  if (MongoDB.readyState === 1) {
    res.status(200).send({
      status: 'OK'
    })
  } else {
    res.status(500).send({
      status: 'INTERNAL SERVER ERROR'
    })
  }
}
