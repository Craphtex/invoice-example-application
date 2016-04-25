Meteor.startup(function() {
  // Generate new invoices on startup
  InvoiceTicketsCollection.remove({});
  createTicketsForFirstTwoMonths(0);
});

createTickets = function(startDate, days, numberOfTickets, startId) {
  for (let invoiceNumber = startId + 1; invoiceNumber <= startId + numberOfTickets; invoiceNumber++) {
    let createdAt = new Date(startDate);
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * days));
    createdAt.setHours(0);
    createdAt.setMinutes(0);
    createdAt.setSeconds(0);
    createdAt.setMilliseconds(0);
    let total = Math.floor(Math.random() * 20) * 10;
    let names = ['smith', 'jones', 'taylor', 'brown', 'williams', 'wilson', 'johnson', 'davies', 'robinson', 'wright', 'thompson', 'evans', 'walker', 'white', 'roberts', 'green', 'hall', 'wood', 'jackson', 'clarke'];
    let domains = ['gmail.com', 'hotmail.com', 'aol.com', 'yahoo.com', 'me.com', 'iohk.io'];
    let email = names[Math.floor(Math.random()*names.length)] + '+' + Math.floor(Math.random() * 10) + '@' + domains[Math.floor(Math.random()*domains.length)];
    InvoiceTicketsCollection.insert({'invoiceNumber': invoiceNumber, 'email': email, 'total': total, 'createdAt': createdAt});
  }
}
createTicketsForFirstWeek = function(startId) {
  createTickets(new Date(), 7, 50, startId);
}
createTicketsForFirstMonth = function(startId) {
  createTicketsForFirstWeek(startId + 150);
  createTickets(new Date(new Date() + 7), 23, 150, startId); // Not exact but good enough
}
createTicketsForFirstTwoMonths = function(startId) {
  createTicketsForFirstMonth(startId + 150);
  createTickets(new Date(new Date() + 30), 31, 150, startId); // Not exact but good enough
}
