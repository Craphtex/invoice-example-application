goTo = function(timeFrame) {
  FlowRouter.go('/:timeFrame', {timeFrame: timeFrame}, FlowRouter.current().queryParams);
}

date = new ReactiveVar({});
days = new ReactiveVar(0);

StateMachine = class StateMachine {
  static get(key, defaultValue) {
    return FlowRouter.getQueryParam(key) || defaultValue;
  }

  static set(key, value) {
    value = (value) ? (value || null) : null;
    FlowRouter.setQueryParams({[key]: value});
  }

  static toggle(key, values) {
    let index = (values.indexOf(FlowRouter.getQueryParam(key)) + 1) % values.length;
    FlowRouter.setQueryParams({[key]: values[index]});
  }
}

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
