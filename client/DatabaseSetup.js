Template.DatabaseSetup.events({
  'click #generate': function () {
  	Meteor.call('generate-invoices');
  }
});