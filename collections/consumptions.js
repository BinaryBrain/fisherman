Consumptions = new Mongo.Collection("consumptions");
Consumptions.attachSchema(new SimpleSchema({
	'user.id': {
		type: String,
		label: "UserId",

		autoform: {
			type: "hidden",
			label: false
		}
	},

	'user.name': {
		type: String,
		label: "Username",

		autoform: {
			type: "hidden",
			label: false
		}
	},

	datetime: {
		type: Date,
		label: "Datetime",
		defaultValue: new Date(),

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
			"Spearmint",
			"Tropical",
			"Liguorice",
			"Sweet Liquorice"
		]
	},

	"geoloc.latitude": {
		type: Number,
		decimal: true,
		label: "Latitude",
		optional: true,
		min: -90,
		max: 90
	},

	"geoloc.longitude": {
		type: Number,
		decimal: true,
		label: "Longitude",
		optional: true,
		min: -180,
		max: 180
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
