let mongoose = require('mongoose');

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

let UserSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
	},
	password: {
		type: String,
		trim: true,
		required: "Password is Required",
		validate: [
			function(input) {
				return input.length >= 6;
			},
			"Password should be longer."
		]
	},
	last_login: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active'
	},
	headline: [
		{
			type: Schema.Types.ObjectId,
			ref: "Headline"
		}
	]
});

let User = mongoose.model("User", UserSchema);

module.exports = User;