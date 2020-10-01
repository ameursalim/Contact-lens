const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  avatar: { type: String, default: 'https://robohash.org/3?200x200' },
  address: { type: String, default: 'please provide an address' },
  telephone: { type: String, default: 'please provide a telephone number' },
  info: {
    id_ContactLens: { type: Schema.Types.ObjectId, ref: "Lens" },
    frequency : { type:String, enum :["daily","weekly","monthly"], default: "daily" },
    reminder : { type: String, default: Date.now },
    delivered : { type: Boolean, default: false},
    carteVitale: { type: String, default: 'please provide your securiy card number'},
    mutuelle : { type: String, default: 'please provide your complementary insurance number'},
    ordonnance: { type: String, default: '#'},
  },
})

const User = mongoose.model("User", userSchema);

module.exports = User;
