export default async function decorate(block) {
  const pictures = block.getElementsByTagName('picture');

  Object.values(pictures).forEach((p) => {
    p.addEventListener('mouseover', () => {
      p.style.opacity = '0.8';
    });
    p.addEventListener('mouseleave', () => {
      p.style.opacity = '1';
    });
  });
}
