const DEFAULT_DEBOUNCE = 200;

Template.InfiniteScroll.onCreated(() => {
  showMoreVisible = (eventName) => {
    let target = this.$('.infiniteScroller');
    //console.log(Template.currentData());
    if (!target.length) return;

    let threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        target.trigger(eventName);
    }
  }
});

Template.InfiniteScroll.onRendered(function() {
  $(window).on('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, Template.currentData().debounce || DEFAULT_DEBOUNCE));
});

Template.InfiniteScroll.onDestroyed(function() {
  $(window).off('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, Template.currentData().debounce || DEFAULT_DEBOUNCE));
});
