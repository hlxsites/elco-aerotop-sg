export default function decorate(block) {
  const rowCols = block.children[0].children.length;
  Object.entries(block.children).forEach((row) => {
    if (row[1].children.length < rowCols) {
      const connectedCell = document.createElement('div');
      connectedCell.classList.add('connected-cell');
      row[1].insertBefore(connectedCell, row[1].children[1]);
    }
  });
}
