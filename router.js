Router.route('/', function () {
	this.render('home', {
		data: function () {
			return Consumptions.find({});
		}
	});
});

Router.route('/add', function () {
	this.render('add', {
		data: function () {
			return Consumptions.find({});
		}
	});
});

