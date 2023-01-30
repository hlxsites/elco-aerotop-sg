function buildTechnologyTable(block) {
  const firstDivElements = block.querySelectorAll('.technology-table > div');
  firstDivElements.forEach((element, i) => {
    const secondLevelDiv = element.querySelectorAll('div > div');
    secondLevelDiv.forEach((subelement, j) => {
      if (i === 0) {
        const TextInDiv = subelement.textContent;
        subelement.textContent = '';
        const title = document.createElement('h1');
        title.textContent = TextInDiv;
        title.style.fontSize = 'var(--heading-font-size-l)';
        title.style.textAlign = 'left';
        subelement.appendChild(title);
      }
      if (i === 0) {
        subelement.classList.add(`techno-table-title-${j}`);
      } else if (i === 1) {
        subelement.classList.add(`techno-table-image-${j}`);
      } else if (i === 2) {
        subelement.classList.add(`techno-table-description-${j}`);
      }
    });
  });
}

function createTableForMobile(block) {
  const newTableTechnoForMobile = document.createElement('div');
  newTableTechnoForMobile.classList.add('table-techno-mobile');
  block.parentElement.appendChild(newTableTechnoForMobile);

  const titleTables = [];
  const imageTables = [];
  const descriptionTables = [];

  const firstDivElements = block.querySelectorAll('.technology-table > div');
  firstDivElements.forEach((element, i) => {
    const secondLevelDiv = element.querySelectorAll('div > div');
    secondLevelDiv.forEach((subelement, j) => {
      if (i === 0) {
        titleTables[j] = subelement.cloneNode(true);
      } else if (i === 1) {
        imageTables[j] = subelement.cloneNode(true);
      } else if (i === 2) {
        descriptionTables[j] = subelement.cloneNode(true);
      }
    });
  });

  titleTables.forEach((theTitle, i) => {
    const TextInDiv = titleTables[i].textContent;
    titleTables[i].textContent = '';
    const titleH1 = document.createElement('h1');
    titleH1.textContent = TextInDiv;
    titleH1.style.fontSize = 'var(--heading-font-size-l)';
    titleH1.style.textAlign = 'left';
    titleTables[i].style.margin = '0 0 20px 0';

    descriptionTables[i].style.margin = '0 0 20px 0';

    titleTables[i].appendChild(titleH1);
    newTableTechnoForMobile.appendChild(titleTables[i]);
    newTableTechnoForMobile.appendChild(imageTables[i]);
    newTableTechnoForMobile.appendChild(descriptionTables[i]);
  });
}

export default async function decorate(block) {
  buildTechnologyTable(block);
  createTableForMobile(block);
}
