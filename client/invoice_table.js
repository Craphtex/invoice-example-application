Template.InvoiceTable.onCreated(function () {
  var instance = this;

  instance.autorun(function () {
    Meteor.subscribe('invoices', date.get(), days.get(), limit.get());
  });
});

Template.InvoiceTable.helpers({
  invoices: function () {
    return InvoiceTicketsCollection.find(getFilter(date.get(), days.get()), {
      sort: {
        createdAt: sortState.get('sortCreatedAt', true),
        total: sortState.get('sortTotal', true)
      },
      limit: limit.get()
    });
  },
  createdAtButtonText: function () {
    return sortState.get('sortCreatedAt');
  },
  totalButtonText: function () {
    return sortState.get('sortTotal');
  },
  dummy: function () {
    return "Test";
  }
});

Template.InvoiceTable.events({
  "click #createdAt": function (event) {
    sortState.toggle('sortCreatedAt');
  },
  "click #total": function (event) {
    sortState.toggle('sortTotal');
  },
  "becameVisible #showMoreResults": function (event) {
    visible.set(!(InvoiceTicketsCollection.find(getFilter(date.get(), days.get()), {
      sort: {
        createdAt: sortState.get('sortCreatedAt', true),
        total: sortState.get('sortTotal', true)
      },
      limit: limit.get()
    }).count() < limit.get()));
  }
});

visible = new ReactiveVar(true);