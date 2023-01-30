function buildTechnologyTable(block) {
    const rows = block.querySelectorAll('.technology-table > div');
    rows.forEach((cell, i) => {
        const secondLevelDiv = cell.querySelectorAll('div > div');
        secondLevelDiv.forEach((subelement, j) => {
            if (i === 0) {
                const textTitle0 = cell.children.item(0).textContent;
                const textTitle1 = cell.children.item(1).textContent;
                const textTitle2 = cell.children.item(2).textContent;
                cell.children.item(0).textContent = '';
                cell.children.item(1).textContent = '';
                cell.children.item(2).textContent = '';

                const title0 = document.createElement('h1');
                const title1 = document.createElement('h1');
                const title2 = document.createElement('h1');

                title0.textContent = textTitle0;
                title1.textContent = textTitle1;
                title2.textContent = textTitle2;

                title0.style.fontSize = 'var(--heading-font-size-l)';
                title1.style.fontSize = 'var(--heading-font-size-l)';
                title2.style.fontSize = 'var(--heading-font-size-l)';

                title0.style.textAlign = 'left';
                title1.style.textAlign = 'left';
                title2.style.textAlign = 'left';

                cell.children.item(0).appendChild(title0);
                cell.children.item(1).appendChild(title1);
                cell.children.item(2).appendChild(title2);

                cell.children.item(0).classList.add('techno-table-title-0');
                cell.children.item(1).classList.add('techno-table-title-1');
                cell.children.item(2).classList.add('techno-table-title-2');
            } else if (i === 1) {
                cell.children.item(0).classList.add('techno-table-image-0');
                cell.children.item(1).classList.add('techno-table-image-1');
                cell.children.item(2).classList.add('techno-table-image-2');
            } else if (i === 2) {
                cell.children.item(0).classList.add('techno-table-description-0');
                cell.children.item(1).classList.add('techno-table-description-1');
                cell.children.item().classList.add('techno-table-description-2');
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
