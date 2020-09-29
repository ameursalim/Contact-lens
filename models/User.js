const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  avatar: String,
  address: String,
  telephone: Number,
  info: {
    id_ContactLens: { type: Schema.Types.ObjectId, ref: "Lens" },
    frequency : {type:String, enum :["daily","weekly","monthly"]},
    reminder : Date,
    delivered : Boolean,
    carteVitale: String,
    mutuelle : String,
    ordonnance: String,
  },
})

const User = mongoose.model("User", userSchema);

module.exports = User;
