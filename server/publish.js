Meteor.publish('invoices', function(date, days, limit) {
  limit = limit || 10;
  return InvoiceTicketsCollection.find(getFilter(date, days), {limit: limit});
});
