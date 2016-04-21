TemplateController('filter_boxes', {
  state: {
    filter: {}
  },

  events: {
    'boxUpdated'(event, instance, data) {
      if (data.value.length !== 0)
        this.state.filter()[data.field] = data.value;
      else
        delete this.state.filter()[data.field];
      this.$('.event-holder').trigger(this.data.eventName, [{filter: this.state.filter()}]);
    }
  }
});

TemplateController('filter_box', {
  events: {
    'keyup'(event) {
      if (event.keyCode === 13) {
        let elem = this.$('.' + this.data.field);
        elem.trigger('boxUpdated', [{field: this.data.field, value: elem.val()}]);
      }
      return false;
    }
  }
});
