let mongoose = require('mongoose');

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

let HeadlineSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

let Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;