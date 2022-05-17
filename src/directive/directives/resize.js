/**
 * @Description: 监听DOM元素大小改变
 * @Author: Zander
 * @Date: 2022/5/6 16:09
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:09
 */
import { isFunction } from '@utils/verify';
import { commonUtils } from '@utils/common';

const data = {};
const observer = {};
const obj = {};

/**
 * 是否支持原生resize observer
 * @returns {boolean}
 */
const supportResizeObserver = () => {
  return window.ResizeObserver && isFunction(window.ResizeObserver);
}

const emitElementSize = (id) => {
  const { el, value } = data[id];
  const { scrollWidth, scrollHeight } = el;
  value({
    customId: id,
    width: scrollWidth,
    height: scrollHeight
  });
}

const createObject = (id) => {
  obj[id] = document.createElement('object');
  obj[id].style.display = 'block';
  obj[id].style.position = 'absolute';
  obj[id].style.top = '0px';
  obj[id].style.left = '0px';
  obj[id].style.width = '100%';
  obj[id].style.height = '100%';
  obj[id].style.border = 'none';
  obj[id].style.padding = '0';
  obj[id].style.margin = '0';
  obj[id].style.opacity = '0';
  obj[id].style.zIndex = '-1000';
  obj[id].style.pointerEvents = 'none';
  obj[id].type = 'text/html';
  obj[id].tabindex = '-1';
  obj[id].data = 'about:blank';
  obj[id]['aria-hidden'] = 'true';
  const { modifiers } = data[id];
  modifiers.immediate && emitElementSize(id);
  obj[id].onload = () => {
    obj[id].contentDocument.defaultView.addEventListener('resize', () => {
      emitElementSize(id);
    });
  };
  return obj[id];
}

const createObserver = (id) => {
  let first = true;
  const { modifiers, el } = data[id];
  observer[id] = new ResizeObserver(() => {
    // 第一次触发，此时是渲染阶段触发的
    if (first) {
      first = false;
      if (!modifiers.immediate) {
        return;
      }
    }
    emitElementSize(id);
  });
  observer[id].observe(el);
}

export default {
  bind(el, binding) {
    const { value, modifiers } = binding;
    const uid = commonUtils.getUUID();
    el.customId = uid;
    data[uid] = {
      modifiers: modifiers,
      el: el,
      value: value
    };
    if (!isFunction(value)) {
      throw new Error(`${value} must be a function`);
    }
    if (supportResizeObserver()) {
      createObserver(uid);
      return;
    }
    el.style.position = 'relative';
    el.appendChild(createObject(uid));
  },
  unbind(el) {
    const uid = el.customId;
    delete data[uid];
    if (supportResizeObserver()) {
      observer[uid].unobserve(el);
      observer[uid].disconnect();
      delete observer[uid];
      delete el.customId;
      return;
    }
    obj[uid].contentDocument.defaultView.removeEventListener(
      'resize',
      () => {}
    );
    el.removeChild(obj[uid]);
    delete el.customId;
  }
}
