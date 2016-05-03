AutoForm.hooks({
	insertConsumptionForm: {
		before: {
			insert: function(doc) {
				doc.user = Meteor.userId();
				return doc;
			}
		},
		
		after: {
			insert: function (err, result) {
				Router.go("/");
			}
		}
	}
});
