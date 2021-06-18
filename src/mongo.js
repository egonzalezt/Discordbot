const mongoose = require('mongoose')
//const { MONGO_URLI } = require('./config.json')
const { MONGO_URLI } = require('/app/src/config.json')

module.exports = async () => {
  await mongoose.connect(MONGO_URLI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}