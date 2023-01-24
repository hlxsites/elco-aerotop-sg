function createFadeInImage(block) {
  block.id='fade-in';
  const firstLevelDivs = block.querySelectorAll(':scope > div');
  console.log(block.parentNode);
  console.log('size es '+firstLevelDivs.length)
  firstLevelDivs.forEach((element, i) => {
    console.log(firstLevelDivs[i]);
    firstLevelDivs[i].classList.add(`image-${i}`);
});
}

export default async function decorate(block) {
  createFadeInImage(block);
}
