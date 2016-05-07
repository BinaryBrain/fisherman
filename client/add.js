AutoForm.hooks({
	insertConsumptionForm: {
		before: {
			insert: function(doc) {
				doc.user = {};
				doc.user.id = Meteor.userId();
				doc.user.name = Meteor.user().username;
				return doc;
			}
		},
		
		after: {
			insert: function (err, result) {
				if (!err) {
					Router.go("/");
				}
			}
		}
	}
});
