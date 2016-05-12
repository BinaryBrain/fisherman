Template.chart.onCreated(function () {
	Meteor.subscribe('consumptions', function () {
		computeChart(Consumptions.find().fetch());
	});
});

Template.chart.onRendered(function () {
	chart = new Chartist.Line('.ct-chart', {
		series: []
	}, {
		axisX: {
			type: Chartist.FixedScaleAxis,
			divisor: 0,
			labelInterpolationFnc: function(value) {
				return moment(value).format('MMM D');
			}
		},
		axisY: {
			onlyInteger: true,
			low: 0
		},
		lineSmooth: false,
		height: 400
	});
});

function computeChart(data) {
	if (typeof data === 'undefined') {
		console.warn('data undefined');
		return;
	}

	var MS_DAY = 1000 * 60 * 60 * 24;
	
	var groupByUser = {};
	
	var minTime = Infinity;
	var maxTime = -Infinity;

	for (var i = 0, l = data.length; i < l; i++) {
		data[i].datetime = datetimeToDate(data[i].datetime);
		minTime = Math.min(minTime, data[i].datetime);
		maxTime = Math.max(maxTime, data[i].datetime);

		if (typeof groupByUser[data[i].user.name] === 'undefined') {
			groupByUser[data[i].user.name] = [data[i]];
		} else {
			groupByUser[data[i].user.name].push(data[i]);
		}
	}
	
	for (var i in groupByUser) {
		var groupByDate = {};

		for (var j = 0, l = groupByUser[i].length; j < l; j++) {
			if (typeof groupByDate[groupByUser[i][j].datetime.getTime()] === 'undefined') {
				groupByDate[groupByUser[i][j].datetime.getTime()] = 1;
			} else {
				groupByDate[groupByUser[i][j].datetime.getTime()]++;
			}
		}

		groupByUser[i] = groupByDate;
	}

	var newSeries = [];
	var newLabels = [];

	for (var i in groupByUser) {
		var serieData = [];
		newLabels.push(i);

		for (var j in groupByUser[i]) {
			serieData.push({ x: j, y: groupByUser[i][j] });
		}
		
		newSeries.push({ name: i, data: serieData });
	}

	for (var i in newSeries) {
		for (var curTime = minTime; curTime <= maxTime; curTime += MS_DAY) {
			var alreadyExists = false;

			for (var j = 0, l = newSeries[i].data.length; j < l; j++) {
				if (newSeries[i].data[j].x == curTime) {
					alreadyExists = true;
				}
			}

			if (!alreadyExists) {
				newSeries[i].data.push({ x: curTime, y: 0 });
			}
		}
	}

	for (var i = 0, l = newSeries.length; i < l; i++) {
		newSeries[i].data.sort(serieCompare);
	}

	var html = '<ul>';
	for (var i = 0, l = newSeries.length; i < l; i++) {
		html += '<li><span class="ct-series-' + i + '">' + newSeries[i].name + '</span></li>';
	}
	html += '</ul>';

	document.querySelector('#chart-legend').innerHTML = html;

	if (typeof chart !== 'undefined') {
		console.log('updating chart');
		chart.update({
			series: newSeries,
			labels: newLabels
		}, {
			axisX: {
				divisor: (maxTime - minTime) / MS_DAY,
			}
		}, true);
	} else {
		console.warn('chart undefined');
	}

	function serieCompare(a,b) {
		if (a.x < b.x)
			return -1;
		if (a.x > b.x)
			return 1;
		return 0;
	}

	function datetimeToDate(datetime) {
		return new Date(Math.floor(datetime / MS_DAY) * MS_DAY);
	}
}
