import { addListener, removeListener } from 'resize-detector';
import _ from 'lodash';

export default {
  mounted() {
    const { onResize } = this;
    this.__resizeHandler = _.debounce(() => {
      if (typeof onResize === 'function') onResize();
    }, 100);

    this.$nextTick(() => {
      addListener(this.$el, this.__resizeHandler);
    });
  },
  beforeDestroy() {
    removeListener(this.$el, this.__resizeHandler);
  }
}