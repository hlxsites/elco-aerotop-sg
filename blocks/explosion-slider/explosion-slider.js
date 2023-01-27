/**
 * animates vent and lid sprites
 * @param sprite DOM element to animate
 * @param height height of the container in DOM (in px)
 * @param visible visible part of the container (in px)
 * @param from [0, 1] percentage of the DOM element visible on the screen to start animation
 * @param to [0, 1] percentage of the DOM element visible on the screen to end animation
 * @param minMargin min margin value of the DOM element at the beginning of animation
 * @param maxMargin max margin value of the DOM element at the beginning of animation
 */
function animateSprite(sprite, height, visible, from, to, minMargin, maxMargin, translate) {
  const startAnimate = height * from;
  const stopAnimate = height * to;

  const step = (maxMargin - minMargin) / (stopAnimate - startAnimate);

  console.log(`start: ${startAnimate}, stop: ${stopAnimate}, visible: ${visible}, step: ${step}`);

  if (visible < startAnimate) {
    sprite.style.transform = `scale(1.09) translate(${translate}%) translateY(${maxMargin}%)`;
  } else if (visible > stopAnimate) {
    sprite.style.transform = `scale(1.09) translate(${translate}%) translateY(${minMargin}%)`;
  } else {
    const overlap = visible - startAnimate;
    sprite.style.transform = `scale(1.09) translate(${translate}%) translateY(${maxMargin - step * overlap}%)`;
  }
}

/**
 * animates text elements' opacity
 * @param text DOM element to animate its opacity
 * @param height height of the container in DOM (in px)
 * @param visible visible part of the container (in px)
 * @param from [0, 1] percentage of the container visible on the screen to start animation
 * @param to [0, 1] percentage of the container visible on the screen to end animation
 * @param minOpacity min opacity value of the DOM element at the beginning of animation
 * @param maxOpacity max opacity value of the DOM element at the beginning of animation
 */
function animateText(text, height, visible, from, to, minOpacity, maxOpacity) {
  const startAnimate = height * from;
  const stopAnimate = height * to;

  const step = (maxOpacity - minOpacity) / (stopAnimate - startAnimate);
  if (visible < startAnimate) {
    text.style.opacity = `${minOpacity}`;
  } else if (visible > stopAnimate) {
    text.style.opacity = `${maxOpacity}`;
  } else {
    const overlap = visible - startAnimate;
    text.style.opacity = `${overlap * step + minOpacity}`;
  }
}

export default async function decorate(block) {
  const lid = block.querySelector(':scope > div:nth-child(1)');
  const vent = block.querySelector(':scope > div:nth-child(2)');
  const texts = block.querySelectorAll(':scope > div:nth-child(n+4)');

  let ventAnimation, lidAnimation;

  window.addEventListener('scroll', () => {
    const { top, width, bottom } = block.getBoundingClientRect();
    const height = width * (1875 / 2500);

    if (top < window.innerHeight && bottom >= 0) {
      const visible = window.innerHeight - top;

      if (width > 800) {
        if (ventAnimation || lidAnimation) {
          cancelAnimationFrame(ventAnimation);
          cancelAnimationFrame(lidAnimation);
        }

        lidAnimation = requestAnimationFrame(() => {
          animateSprite(lid, height, visible, 0.3, 0.5, 7, 14, -5);
        });
        ventAnimation = requestAnimationFrame(() => {
          animateSprite(vent, height, visible, 0.3, 0.5, -4.5, 0, -4);
        });
        Array.from(texts)
          .forEach((text) => {
            animateText(text, height, visible, 0.5, 0.6, 0, 1);
          });
      } else {
        lidAnimation = requestAnimationFrame(() => {
          animateSprite(lid, height, visible, 0.5, 0.8, 7, 14, -5);
        });
        ventAnimation = requestAnimationFrame(() => {
          animateSprite(vent, height, visible, 0.5, 0.8, -4.5, 0, -4);
        });

        Array.from(texts)
          .forEach((text) => {
            animateText(text, height, visible, 0.8, 1, 0, 1);
          });
      }
    }
  }, false);
}
