Template.pieChart.onCreated(function () {
	Meteor.subscribe('consumptions', function () {
		computeChart(Consumptions.find().fetch());
	});
});

Template.pieChart.onRendered(function () {
	pieChart = new Chartist.Pie('.ct-pie-chart', {
		series: []
	});
});

function computeChart(data) {
	if (typeof data === 'undefined') {
		console.warn('data undefined');
		return;
	}

	var types = [];

	for (var i = 0, l = data.length; i < l; i++) {
		var index = -1;
		
		for (var j = 0, k = types.length; j < k; j++) {
			if (types[j].type === data[i].type) {
				index = j;
				break;
			}
		}

		if (index === -1) {
			types.push({ type: data[i].type, count: 1 });
		} else {
			types[index].count++;
		}
	}

	types.sort(typesCompare).reverse();

	newSeries = types.map(function (t) {
		return t.count;
	});

	var html = '<ul>';
	for (var i = 0, l = types.length; i < l; i++) {
		html += '<li><span class="ct-series-' + i + '">' + types[i].type + '</span></li>';
	}
	html += '</ul>';

	document.querySelector('#pie-chart-legend').innerHTML = html;

	if (typeof pieChart !== 'undefined') {
		console.log('updating pie chart');
		pieChart.update({
			series: newSeries
		}, true);
	} else {
		console.warn('pie chart undefined');
	}

	function typesCompare(a,b) {
		if (a.count < b.count)
			return -1;
		if (a.count > b.count)
			return 1;
		return 0;
	}
}
