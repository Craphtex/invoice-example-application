TemplateController('FilterButtons', {
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
    'click .timeFrame': function (event) {
      goTo(event.currentTarget.id);
    }
  }
});
