function createFadeInImage(block) {
  block.id = 'fade-in';
  const firstLevelDivs = block.querySelectorAll(':scope > div');
  firstLevelDivs.forEach((element, i) => {
    firstLevelDivs[i].classList.add(`image-${i}`);
  });
}

export default async function decorate(block) {
  createFadeInImage(block);
}
