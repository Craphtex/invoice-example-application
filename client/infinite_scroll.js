TemplateController('infinite_scroll', {
  private : {
    defaultDebounce: 200
  },

  onCreated() {
    this.checkIndicatorVisibility = () => {
      let target = this.$('.infinite-scroller');
      if (!target.length) return;

      let threshold = $(window).scrollTop() + $(window).height() - target.height();

      if (target.offset().top < threshold) {
        target.trigger(this.data.eventName);
        //this.triggerEvent(eventName); // Won't work due to a bug in TemplateController package
      }
    };
    this.checkIndicatorVisibilityDebounced = () => {
      return (event) => {
        _.debounce(this.checkIndicatorVisibility(), this.data.debounce || this.defaultDebounce);
      }
    };
  },

  onRendered() {
    $(window).on('scroll', this.checkIndicatorVisibilityDebounced());
  },

  onDestroyed() {
    $(window).off('scroll', this.checkIndicatorVisibilityDebounced());
  }
});
