TemplateController('invoice_table', {
  state: {
    limit: 20,
    searchTerms: {}
  },

  helpers: {
    invoices() {
      let filter = MongoDBQueryFactory.mergeDBFilters(MongoDBQueryFactory.createTimeFilter(date.get(), days.get()),MongoDBQueryFactory.createSearchFilter(Template.instance().state.searchTerms()));
      return InvoiceTicketsCollection.find(filter, {
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
      return (ReactiveMethod.call('totalInvoiceCount', date.get(), days.get(), Template.instance().state.searchTerms()) || 0) > this.state.limit();
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
    },
    'enteredSearchQuery'(event, instance, data) {
      this.state.searchTerms(data.filter);
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
      instance.cursor = instance.subscribe('invoices', date.get(), days.get(), Template.instance().state.searchTerms(), instance.state.limit());
    });
  },
});

TemplateController('invoice_ticket', {
  helpers: {
    formatedDate(date) {
      return date.toISOString().split('T')[0];
    }
  }
});