export default function createOverlay(block) {
  const toolbar = document.createElement('div');
  toolbar.classList.add('asset-viewer-toolbar');

  const toolbarClose = document.createElement('div');
  toolbarClose.classList.add('asset-viewer-close');
  toolbar.appendChild(toolbarClose);
  block.parentElement.appendChild(toolbar);

  return { toolbar, toolbarClose };
}
