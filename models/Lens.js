const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LensSchema = new Schema({
	img:String,
	brand:String,
	reference:String,
	description:String
})

const Lens = mongoose.model('Lens', LensSchema)

module.exports = Lens

