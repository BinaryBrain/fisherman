Consumptions = new Mongo.Collection("consumptions");
Consumptions.attachSchema(new SimpleSchema({
	user: {
		type: String,
		label: "User"
	},
	datetime: {
		type: Date,
		label: "Datetime",

		autoform: {
			afFieldInput: {
				type: "datetime-local"
			}
		}
	},
	type: {
		type: String,
		label: "Type",
		allowedValues: ["Citrus", "Eucalyptus", "Mint"]
	},
	"geoloc.latitude": {
		type: Number,
		optional: true
	},
	"geoloc.longitude": {
		type: Number,
		optional: true
	},
}));
