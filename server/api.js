Meteor.startup(function () {
	// Global configuration
	Api = new Restivus({
		version: 'v1',
		useDefaultAuth: true,
		prettyJson: true
	});

	Api.addCollection(Consumptions);
	Api.addCollection(Meteor.users);
});
