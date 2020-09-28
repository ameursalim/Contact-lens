const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  avatar: String,
  addresse: String,
  telephone: Number,
  info: {
	id_ContactLens: { type: Schema.Types.ObjectId, ref: "Lens" },
<<<<<<< HEAD
	frequency : {type:String, enum :["daily","weekly","monthly"], default: "daily"},
=======
	frequency : {type: String, enum :["daily","weekly","montly"]},
>>>>>>> fff332dbcab29b0c0559c97e8dbfa0994e268d62
	reminder : Date,
	delivered : Boolean,
	carteVital: String,
	mutuelle : String,
	ordonnance: String,
	
},
})

const User = mongoose.model("User", userSchema);

module.exports = User;
