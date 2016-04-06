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
  moreResults: function() {
    return !(InvoiceTicketsCollection.find({}).count() < limit.get());
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

function showMoreVisible() {
  var threshold, target = $("#showMoreResults");
  if (!target.length) return;

  threshold = $(window).scrollTop() + $(window).height() - target.height();

  if (target.offset().top < threshold) {
    if (!target.data("visible")) {
      target.data("visible", true);
      limit.set(limit.get() + 20);
    }
  } else {
    if (target.data("visible")) {
      target.data("visible", false);
    }
  }        
}

$(window).scroll(showMoreVisible);