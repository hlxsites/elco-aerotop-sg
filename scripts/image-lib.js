const PICTURE_ID = 'image-viewer-picture';
function generateImage(sourceElement) {
  const picture = document.createElement('picture');
  picture.id = PICTURE_ID;
  Object.values(sourceElement.children).forEach((picSrc) => {
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
  return picture;
}

function adjustNavButtonVisibility(pictures, currentImagePos, navLeft, navRight) {
  if (pictures.length === 1) {
    navLeft.style.visibility = 'hidden';
    navRight.style.visibility = 'hidden';
  } else if (currentImagePos === pictures.length - 1) {
    navRight.style.visibility = 'hidden';
    navLeft.style.visibility = 'visible';
  } else if (currentImagePos === 0) {
    navLeft.style.visibility = 'hidden';
    navRight.style.visibility = 'visible';
  } else {
    navLeft.style.visibility = 'visible';
    navRight.style.visibility = 'visible';
  }
}
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
  let currentImagePos = [...e.currentTarget.parentElement.children].indexOf(e.currentTarget);
  imageViewerInfobar.innerText = `${currentImagePos + 1} / ${pictures.length}`;

  const imageViewerBackground = document.createElement('div');
  imageViewerBackground.classList.add('image-viewer-background');

  const imageViewerNav = document.createElement('div');

  const navLeft = document.createElement('button');
  navLeft.classList.add('image-viewer-nav-left');
  imageViewerNav.appendChild(navLeft);
  imageViewerNav.classList.add('image-viewer-nav');
  const navRight = document.createElement('button');
  navRight.classList.add('image-viewer-nav-right');
  imageViewerNav.appendChild(navRight);
  adjustNavButtonVisibility(pictures, currentImagePos, navLeft, navRight);

  const imageViewer = document.createElement('div');
  imageViewer.classList.add('image-viewer-image');

  navLeft.addEventListener('click', () => {
    currentImagePos -= 1;

    // switch image
    adjustNavButtonVisibility(pictures, currentImagePos, navLeft, navRight);
    document.getElementById(PICTURE_ID).remove();
    const picture = generateImage(pictures[currentImagePos]);
    imageViewer.appendChild(picture);

    // update infobar
    imageViewerInfobar.innerText = `${currentImagePos + 1} / ${pictures.length}`;
  });

  navRight.addEventListener('click', () => {
    currentImagePos += 1;

    // switch image
    adjustNavButtonVisibility(pictures, currentImagePos, navLeft, navRight);
    document.getElementById(PICTURE_ID).remove();
    const picture = generateImage(pictures[currentImagePos]);
    imageViewer.appendChild(picture);

    // update infobar
    imageViewerInfobar.innerText = `${currentImagePos + 1} / ${pictures.length}`;
  });

  if (e.currentTarget.tagName === 'PICTURE') {
    const picture = generateImage(e.currentTarget);

    imageViewer.appendChild(picture);
    imageViewerWrapper.appendChild(imageViewerInfobar);
    imageViewerWrapper.appendChild(imageViewerToolbar);
    imageViewerWrapper.appendChild(imageViewer);
    imageViewerWrapper.appendChild(imageViewerNav);
    imageViewerWrapper.appendChild(imageViewerBackground);
    block.parentElement.appendChild(imageViewerWrapper);

    closeButton.addEventListener('click', () => {
      imageViewerWrapper.remove();
    });
  }
}
