Template.InfiniteScroll.onCreated(() => {
  showMoreVisible = (eventName) => {
    let target = this.$('.infiniteScroller');
    if (!target.length) return;

    let threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        target.trigger(eventName);
    }
  }
});

Template.InfiniteScroll.onRendered(function() {
  $(window).on('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, 200));
});

Template.InfiniteScroll.onDestroyed(function() {
  $(window).off('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, 200));
});
