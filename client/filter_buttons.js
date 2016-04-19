TemplateController('filter_buttons', {
  helpers: {
    _: function () {
      return _
    },
    buttons: function () {
      return [
        {id: 'today',    text: 'Today'    },
        {id: 'oneWeek',  text: 'One Week' },
        {id: 'oneMonth', text: 'One Month'},
        {id: 'all',      text: 'All'      }
      ];
    }
  },

  events: {
    'click .timeFrame'(event) {
      goTo(event.currentTarget.id);
    }
  }
});
