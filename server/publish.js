Meteor.publish('invoices', function(date, days, limit) {
  if ((limit || 0) < 1) limit = 10;
  return InvoiceTicketsCollection.find(getFilter(date, days), {limit: limit});
});
