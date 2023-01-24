export default function generateImageOverlayImpl(e, block, pictures) {
  const imageViewerWrapper = document.createElement('div');
  imageViewerWrapper.classList.add('image-viewer-wrapper');

  const imageViewerToolbar = document.createElement('div');
  imageViewerToolbar.classList.add('image-viewer-toolbar');
  const closeButton = document.createElement('button');
  closeButton.classList.add('image-viewer-close');
  imageViewerToolbar.appendChild(closeButton);
  const imageViewerInfobar = document.createElement('div');
  imageViewerInfobar.classList.add('image-viewer-infobar');
  imageViewerInfobar.innerText = `${[...e.currentTarget.parentElement.children].indexOf(e.currentTarget) + 1} / ${pictures.length}`;

  const imageViewerBackground = document.createElement('div');
  imageViewerBackground.classList.add('image-viewer-background');

  const imageViewer = document.createElement('div');
  imageViewer.classList.add('image-viewer-image');

  if (e.currentTarget.tagName === 'PICTURE') {
    const picture = document.createElement('picture');
    Object.values(e.currentTarget.children).forEach((picSrc) => {
      switch (picSrc.tagName) {
        case 'SOURCE': {
          const source = document.createElement('source');
          source.type = picSrc.type;
          source.srcset = picSrc.srcset;
          source.media = picSrc.media;
          picture.appendChild(source);
          break;
        }
        case 'IMG': {
          const img = document.createElement('img');
          img.loading = picSrc.loading;
          img.alt = picSrc.alt;
          img.type = picSrc.type;
          img.src = picSrc.src;
          img.width = picSrc.width;
          img.height = picSrc.height;
          picture.appendChild(img);
          break;
        }
        default:
      }
    });

    imageViewer.appendChild(picture);
    imageViewerWrapper.appendChild(imageViewerInfobar);
    imageViewerWrapper.appendChild(imageViewerToolbar);
    imageViewerWrapper.appendChild(imageViewer);
    imageViewerWrapper.appendChild(imageViewerBackground);
    block.parentElement.appendChild(imageViewerWrapper);

    imageViewerBackground.addEventListener('click', () => {
      imageViewerWrapper.remove();
    });
    closeButton.addEventListener('click', () => {
      imageViewerWrapper.remove();
    });
  }
}
