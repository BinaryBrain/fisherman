Router.route('/', function () {
	this.render('home', {
		data: function () {
			return Consumptions.find({});
		}
	});
});

Router.route('/add', function () {
	console.log(Meteor.userId())
	if (!Meteor.userId()) {
		Router.go("/");
	}

	this.render('add');
});
