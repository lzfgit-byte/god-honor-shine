import { computed } from 'vue';
import type { PropType } from '../ToolTipType';

export default (props: PropType) => {
  const total = '100%';
  const totalHundred = '100%';
  const direction = {
    t: {
      top: '0%',
      right: null,
      bottom: null,
      left: '50%',
      translateX: '-50%',
      translateY: `-${total}`,
    },
    r: {
      top: '50%',
      right: '0%',
      bottom: null,
      left: null,
      translateX: `${total}`,
      translateY: '-50%',
    },
    b: {
      top: null,
      right: null,
      bottom: '0%',
      left: '50%',
      translateX: '-50%',
      translateY: `${total}`,
    },
    l: {
      top: '50%',
      right: null,
      bottom: null,
      left: '0%',
      translateX: `-${total}`,
      translateY: '-50%',
    },
    tr: {
      top: '0%',
      right: `0%`,
      bottom: null,
      left: null,
      padding: 0,
      translateX: `${totalHundred}`,
      translateY: `-${totalHundred}`,
    },
    tl: {
      top: '0%',
      right: null,
      bottom: null,
      left: '0%',
      padding: 0,
      translateX: `-${totalHundred}`,
      translateY: `-${totalHundred}`,
    },
    bl: {
      top: null,
      right: null,
      bottom: '0%',
      left: '0%',
      padding: 0,
      translateX: `-${totalHundred}`,
      translateY: `${totalHundred}`,
    },
    br: {
      top: null,
      right: '0%',
      bottom: '0%',
      left: null,
      padding: 0,
      translateX: `${totalHundred}`,
      translateY: `${totalHundred}`,
    },
  };

  const arrowMove = '2px';
  const arrowDirection = {
    t: {
      top: null,
      right: null,
      bottom: '0%',
      left: '50%',
      translateX: '-50%',
      translateY: `-${arrowMove}`,
    },
    r: {
      top: '50%',
      right: null,
      bottom: null,
      left: '0%',
      translateX: `${arrowMove}`,
      translateY: '-50%',
    },
    b: {
      top: 0,
      right: null,
      bottom: null,
      left: '50%',
      translateX: '-50%',
      translateY: `${arrowMove}`,
    },
    l: {
      top: '50%',
      right: '0%',
      bottom: null,
      left: null,
      translateX: `-${arrowMove}`,
      translateY: '-50%',
    },
    tr: {
      display: 'none',
      top: '0%',
      right: `0%`,
      bottom: null,
      left: null,
      padding: 0,
      translateX: `${totalHundred}`,
      translateY: `-${totalHundred}`,
    },
    tl: {
      display: 'none',
      top: '0%',
      right: null,
      bottom: null,
      left: '0%',
      padding: 0,
      translateX: `-${totalHundred}`,
      translateY: `-${totalHundred}`,
    },
    bl: {
      display: 'none',
      top: null,
      right: null,
      bottom: '0%',
      left: '0%',
      padding: 0,
      translateX: `-${totalHundred}`,
      translateY: `${totalHundred}`,
    },
    br: {
      display: 'none',
      top: null,
      right: '0%',
      bottom: '0%',
      left: null,
      padding: 0,
      translateX: `${totalHundred}`,
      translateY: `${totalHundred}`,
    },
  };
  const currentStyle = computed(() => {
    const current = direction[props.direction];
    let html = '';
    const transformKey = ['translateX', 'translateY'];
    let transformStyle = '';
    for (const key in current) {
      if (current[key] !== null) {
        if (transformKey.includes(key)) {
          transformStyle += `${key}(${current[key]}) `;
        } else {
          html += `${key}:${current[key]};`;
        }
      }
    }
    transformStyle = `transform:${transformStyle}`;
    html += transformStyle;
    return html;
  });
  const currentArrowStyle = computed(() => {
    const current = arrowDirection[props.direction];
    let html = '';
    let transformStyle = '';
    const transformKey = ['translateX', 'translateY'];
    for (const key in current) {
      if (current[key] !== null) {
        if (transformKey.includes(key)) {
          transformStyle += `${key}(${current[key]}) `;
        } else {
          html += `${key}:${current[key]};`;
        }
      }
    }
    transformStyle = `transform:${transformStyle} rotate(45deg)`;
    html += transformStyle;
    return html;
  });
  return { currentStyle, currentArrowStyle };
};
