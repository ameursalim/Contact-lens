const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  avatar: String,
  adresse: String,
  telephone: Number,
  info: {
	id_ContactLens: { type: Schema.Types.ObjectId, ref: "Lens" },
	frequency : {type: String, enum :["daily","weekly","montly"]},
	reminder : Date,
	delivered : Boolean,
	carteVital: String,
	mutuelle : String,
	ordonnance: String,
	
},
})

const User = mongoose.model("User", userSchema);

module.exports = User;
