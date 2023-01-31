function buildTechnologyTable(block) {
  const rows = block.querySelectorAll('.technology-table > div');
  rows.forEach((cell, i) => {
    Array.from(cell.children)
      .forEach((child) => {
        if (i === 0) {
          const titleText = child.textContent;
          const title = document.createElement('h1');

          child.textContent = '';
          title.textContent = titleText;
          title.style.fontSize = 'var(--heading-font-size-l)';
          title.style.textAlign = 'left';

          child.appendChild(title);
          child.classList.add('techno-table-title');
        } else if (i === 1) {
          child.classList.add('techno-table-image');
        } else if (i === 2) {
          child.classList.add('techno-table-description');
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

  const rows = block.querySelectorAll('.technology-table > div');
  rows.forEach((element, i) => {
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
    const textInDiv = titleTables[i].textContent;
    titleTables[i].textContent = '';
    const titleH1 = document.createElement('h1');
    titleH1.textContent = textInDiv;


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
