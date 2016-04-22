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
          createdAt: Template.instance().sortingToDBSorting[StateMachine.get('sortCreatedAt', 'Asc')],
          total: Template.instance().sortingToDBSorting[StateMachine.get('sortTotal', 'Asc')]
        },
        limit: Template.instance().state.limit()
      });
    },
    createdAtButtonText() {
      return StateMachine.get('sortCreatedAt', 'Asc');
    },
    totalButtonText() {
      return StateMachine.get('sortTotal', 'Asc');
    },
    hasMoreContent() {
      return (ReactiveMethod.call('totalInvoiceCount', date.get(), days.get(), Template.instance().state.searchTerms()) || 0) > this.state.limit();
    }
  },

  events: {
    'click #createdAt'(event) {
      //sortState.toggle('sortCreatedAt');
      StateMachine.toggle('sortCreatedAt', ['Desc', 'Asc'])
    },
    'click #total'(event) {
      //sortState.toggle('sortTotal');
      StateMachine.toggle('sortTotal', ['Desc', 'Asc'])
    },
    'invoiceScrollEvent'(event) {
      this.state.limit(this.state.limit() + 20);
    },
    'enteredSearchQuery'(event, instance, data) {
      StateMachine.set('invoiceNumber', (data.filter.invoiceNumber) ? data.filter.invoiceNumber.filter : null);
      StateMachine.set('email', (data.filter.email) ? data.filter.email.filter : null);
      StateMachine.set('total', (data.filter.total) ? data.filter.total.filter : null);
      StateMachine.set('createdAt', (data.filter.createdAt) ? data.filter.createdAt.filter : null);
      this.state.searchTerms(data.filter);
    }
  },

  onCreated() {
    let instance = this;
    let timeFrame = instance.data.timeFrame;
    instance.sortingToDBSorting = {
      'Desc': 1,
      'Asc': -1,
    };

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