function buildTechnologyTable(block) {
  const rows = block.querySelectorAll('.technology-table > div');
  rows.forEach((cell, i) => {
    if (i === 0) {
      for (let childrenNumber = 0; childrenNumber < cell.children.length; childrenNumber += 1) {
        const textTitle0 = cell.children.item(childrenNumber).textContent;
        cell.children.item(childrenNumber).textContent = '';
        const title0 = document.createElement('h1');
        title0.textContent = textTitle0;
        title0.style.fontSize = 'var(--heading-font-size-l)';
        title0.style.textAlign = 'left';
        cell.children.item(childrenNumber).appendChild(title0);
        cell.children.item(childrenNumber).classList.add('techno-table-title');
      }
    } else if (i === 1) {
      for (let childrenNumber = 0; childrenNumber < cell.children.length; childrenNumber += 1) {
        cell.children.item(childrenNumber).classList.add('techno-table-image');
      }
    } else if (i === 2) {
      for (let childrenNumber = 0; childrenNumber < cell.children.length; childrenNumber += 1) {
        cell.children.item(childrenNumber).classList.add('techno-table-description');
      }
    }
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
