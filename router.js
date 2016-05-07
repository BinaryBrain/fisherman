Router.route('/', function () {
	var consumptions = Consumptions.find({});

	this.render('home', {
		data: {
			consumptions: consumptions
		}
	});
});

Router.route('/add', function () {
	if (!Meteor.userId()) {
		Router.go("/");
	}

	this.render('add');
});

if (Meteor.isServer) {
	Meteor.publish('consumptions', function () {
		return Consumptions.find();
	});
}
