Template.InfiniteScroll.helpers({
  hasMoreResults: () => {
    return Template.currentData().moreContentAvailable;
  }
});

Template.InfiniteScroll.onCreated(() => {
  showMoreVisible = (eventName) => {
    var target = this.$('.infiniteScroller');
    if (!target.length) return;

    let threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
      if (!target.data("visible")) {
        target.data("visible", true);
        target.trigger(eventName);
      }
    } else {
      if (target.data("visible")) {
        target.data("visible", false);
      }
    }
  }
});

Template.InfiniteScroll.onRendered(function() {
  $(window).on('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, 200));
});

Template.InfiniteScroll.onDestroyed(function() {
  $(window).off('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, 200));
});
