Meteor.startup(function () {
	// Global configuration
	Api = new Restivus({
		version: 'v1',
		useDefaultAuth: true,
		prettyJson: true
	});

	Api.addCollection(Consumptions, {
		routeOptions: {
			authRequired: true
		}
	});
});
