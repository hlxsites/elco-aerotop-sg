function buildTechnologyTable(block) {
    block.style.cssText = "display : flex; flex-wrap: wrap; flex-direction: column;";
    const firstDivElements = block.querySelectorAll('.technology-table > div');
    firstDivElements.forEach((element, i) => {
        element.style.display = 'flex';
        const secondLevelDiv = element.querySelectorAll('div > div');
        secondLevelDiv.forEach((subelement, j) => {
            console.log(j + ' ' + secondLevelDiv.length);
            if (j < secondLevelDiv.length - 1) subelement.style.cssText = "flex: 1 1 10%; margin-right: 4%";
            else subelement.style.cssText = "flex: 1 1 10%;";
            if (i === 0) {
                const TextInDiv = subelement.textContent;
                subelement.textContent = '';
                const title = document.createElement("h1");
                title.textContent = TextInDiv;
                title.style.fontSize = 'var(--heading-font-size-l)';
                title.style.textAlign = 'left';
                subelement.appendChild(title);
            }
        });
    });


}

export default async function decorate(block) {
    buildTechnologyTable(block);
}