Meteor.publish('invoices', function(date, days, searchTerms, limit) {
  if ((limit || 0) < 1) limit = 10;
  let filter = MongoDBQueryFactory.mergeDBFilters(MongoDBQueryFactory.createTimeFilter(date, days),MongoDBQueryFactory.createSearchFilter(searchTerms));
  return InvoiceTicketsCollection.find(filter, {limit: limit});
});

Meteor.methods({
  totalInvoiceCount: function(date, days, searchTerms) {
    let filter = MongoDBQueryFactory.mergeDBFilters(MongoDBQueryFactory.createTimeFilter(date, days),MongoDBQueryFactory.createSearchFilter(searchTerms));
    return InvoiceTicketsCollection.find(filter).count();
  }
});
