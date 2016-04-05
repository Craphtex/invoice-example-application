Template.InvoiceTable.helpers({
  invoices: function () {
    return InvoiceTicketsCollection.find(filter.get(), {
      sort: {
        createdAt: sortState.get('sortCreatedAt', true),
        total: sortState.get('sortTotal', true)
      }
    });
  },
  createdAtButtonText: function () {
    return sortState.get('sortCreatedAt');
  },
  totalButtonText: function () {
    return sortState.get('sortTotal');
  }
});

Template.InvoiceTable.events({
  "click #createdAt": function (event) {
    sortState.toggle('sortCreatedAt');
  },
  "click #total": function (event) {
    sortState.toggle('sortTotal');
  }
});
