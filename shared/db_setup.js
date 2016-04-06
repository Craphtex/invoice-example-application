Meteor.methods({
  generateInvoices: function(title) {
    InvoiceTicketsCollection.remove({});
    createTicketsForFirstTwoMonths();
    invoiceNumber = 0;
  }
});

let invoiceNumber = 0;

createTickets = function(startDate, days, numberOfTickets) {
  for (var i = 0; i < numberOfTickets; i++) {
    var createdAt = new Date(startDate);
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * days));
    createdAt.setHours(0);
    createdAt.setMinutes(0);
    createdAt.setSeconds(0);
    createdAt.setMilliseconds(0);
    var total = Math.floor(Math.random() * 20) * 10;
    InvoiceTicketsCollection.insert({"invoiceNumber": invoiceNumber++, "total": total, "createdAt": createdAt});
  }
}
createTicketsForFirstWeek = function() {
  createTickets(new Date(), 7, 50);
}
createTicketsForFirstMonth = function() {
  createTicketsForFirstWeek();
  createTickets(new Date(new Date() + 7), 23, 150); // Not exact but good enough
}
createTicketsForFirstTwoMonths = function() {
  createTicketsForFirstMonth();
  createTickets(new Date(new Date() + 30), 31, 150); // Not exact but good enough
}
