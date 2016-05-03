Consumptions = new Mongo.Collection("consumptions");
Consumptions.attachSchema(new SimpleSchema({
	user: {
		type: String,
		label: "User",
		
		autoform: {
			type: "hidden"
		}
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
		allowedValues: [
			"Apple-Cinnamon",
			"Cinnamon",
			"Cassis",
			"Cherry",
			"Citrus",
			"Mint (sucré)",
			"Mint (sans sucre)",
			"Eucalyptus (sucré)",
			"Eucalyptus (sans sucre)",
			"Anis",
			"Spicy Mandarin",
			"Honey & Lemon",
			"Salmiak",
			"Tropical",
			"Liguorice",
			"Sweet Liquorice"
		]
	},

	"geoloc.latitude": {
		type: Number,
		label: "Latitude",
		optional: true
	},

	"geoloc.longitude": {
		type: Number,
		label: "Longitude",
		optional: true
	},

	"api": {
		type: String,
		label: "API Name",
		optional: true,

		autoform: {
			type: "hidden"
		}
	},
}));
