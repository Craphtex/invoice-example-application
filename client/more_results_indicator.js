Template.MoreResultsIndicator.helpers({
  moreResults: function() {
    console.log(visible.get());
    return visible.get();
  }
});

function showMoreVisible() {
  var threshold, target = this.$("#showMoreResults");
  if (!target.length) return;

  threshold = $(window).scrollTop() + $(window).height() - target.height();

  if (target.offset().top < threshold) {
    if (!target.data("visible")) {
      jQuery("#showMoreResults").trigger(jQuery.Event("becameVisible"));
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