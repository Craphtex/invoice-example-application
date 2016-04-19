const DEFAULT_DEBOUNCE = 200;

TemplateController('infinite_scroll', {
  onCreated() {
    showMoreVisible = (eventName) => {
      let target = this.$('.infiniteScroller');
      if (!target.length) return;

      let threshold = $(window).scrollTop() + $(window).height() - target.height();

      if (target.offset().top < threshold) {
        target.trigger(eventName);
        //this.triggerEvent(eventName); // Won't work due to a bug in TemplateController package
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
