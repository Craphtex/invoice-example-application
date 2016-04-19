TemplateController('InvoiceTable', {
  state: {
    limit: 20
  },

  helpers: {
    invoices() {
      return InvoiceTicketsCollection.find(getFilter(date.get(), days.get()), {
        sort: {
          createdAt: sortState.get('sortCreatedAt', true),
          total: sortState.get('sortTotal', true)
        },
        limit: Template.instance().state.limit()
      });
    },
    createdAtButtonText() {
      return sortState.get('sortCreatedAt');
    },
    totalButtonText() {
      return sortState.get('sortTotal');
    },
    hasMoreContent() {
      return (ReactiveMethod.call('totalInvoiceCount', date.get(), days.get()) || 0) > this.state.limit();
    }
  },

  events: {
    'click #createdAt'(event) {
      sortState.toggle('sortCreatedAt');
    },
    'click #total'(event) {
      sortState.toggle('sortTotal');
    },
    'invoiceScrollEvent'(event) {
      this.state.limit(this.state.limit() + 20);
    }
  },

  onCreated() {
    let instance = this;
    let timeFrame = instance.data.timeFrame;

    instance.autorun(function () {
      if (timeFrame != Template.currentData().timeFrame) {
        timeFrame = Template.currentData().timeFrame;
        instance.state.limit(20);
      }
      instance.cursor = instance.subscribe('invoices', date.get(), days.get(), instance.state.limit());
    });
  }
});
