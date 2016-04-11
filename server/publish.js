Meteor.publish('invoices', function(date, days, limit) {
  limit = limit || 10;
  if (limit > 0) {
    return InvoiceTicketsCollection.find(getFilter(date, days), {limit: limit});
  }
  else {
  	return InvoiceTicketsCollection.find(getFilter(date, days));
  }
});
