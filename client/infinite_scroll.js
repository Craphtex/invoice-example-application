const DEFAULT_DEBOUNCE = 200;

TemplateController('InfiniteScroll', {
  onCreated() {
    showMoreVisible = (eventName) => {
      let target = this.$('.infiniteScroller');
      if (!target.length) return;

      let threshold = $(window).scrollTop() + $(window).height() - target.height();

      if (target.offset().top < threshold) {
        target.trigger(eventName);
      }
    }
  },

  onRendered() {
    $(window).on('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, Template.currentData().debounce || DEFAULT_DEBOUNCE));
  },

  onDestroyed() {
    $(window).off('scroll', _.debounce(() => {showMoreVisible(this.data.eventName)}, Template.currentData().debounce || DEFAULT_DEBOUNCE));
  }

});
