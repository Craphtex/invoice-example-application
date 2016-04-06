Meteor.publish('invoices', function(date, days) {
  return InvoiceTicketsCollection.find(getFilter(date, days));
});
