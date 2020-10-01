const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LensSchema = new Schema({
	img:{ type: String, default: 'please provide your complementary insurance number'},
	brand:{ type: String, default: 'Acuvue'},
	reference:{ type: String, default: '1212'},
	description:{ type: String, default: 'confortable and light'}
})

const Lens = mongoose.model('Lens', LensSchema)

module.exports = Lens

