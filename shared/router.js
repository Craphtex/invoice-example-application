goTo = function(timeFrame) {
  FlowRouter.go('/:timeFrame', {timeFrame: timeFrame}, FlowRouter.current().queryParams);
}

date = new ReactiveVar({});
days = new ReactiveVar(0);

sortState = {
  get: function (queryParam, database) {
    if (database === true) {
      return (FlowRouter.getQueryParam(queryParam) || 'Asc') == 'Asc' ? 1 : -1;
    }
    else {
      return (FlowRouter.getQueryParam(queryParam) || 'Asc') == 'Asc' ? 'Desc' : 'Asc';
    }
  },
  toggle: function (queryParam) {
    let direction = {};
    direction[queryParam] = (FlowRouter.getQueryParam(queryParam) || 'Asc') == 'Asc' ? 'Desc' : 'Asc';
    FlowRouter.setQueryParams(direction);
  }
};

let timeFrames = {};
timeFrames['today'] = 1;
timeFrames['oneWeek'] = 7;
timeFrames['oneMonth'] = 31;
timeFrames['all'] = -1;

let getToday = function() {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

FlowRouter.route('/', {
  action: function(params, queryParams) {
    FlowRouter.go('/:timeFrame', {timeFrame: 'today'}, queryParams);
  }
});

FlowRouter.route('/:timeFrame', {
  name: 'timeFrame',
  action(params, queryParams) {
    date.set(getToday());
    days.set(timeFrames[params.timeFrame]);
    BlazeLayout.render('home', params);
  }
});
