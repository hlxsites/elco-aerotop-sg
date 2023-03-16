const PICTURE_ID = 'image-viewer-picture';

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
  imageViewerToolbar.style.opacity = '0';
  const closeButton = document.createElement('button');
  closeButton.classList.add('image-viewer-close');
  imageViewerToolbar.appendChild(closeButton);
  const imageViewerInfobar = document.createElement('div');
  imageViewerInfobar.classList.add('image-viewer-infobar');
  let currentImagePos = [...e.currentTarget.parentElement.children].indexOf(e.currentTarget);
  imageViewerInfobar.innerText = `${currentImagePos + 1} / ${pictures.length}`;

  const imageViewerBackground = document.createElement('div');
  imageViewerBackground.classList.add('image-viewer-background');
  imageViewerBackground.style.opacity = '0';

  const imageViewerNav = document.createElement('div');

  const navLeft = document.createElement('button');
  navLeft.classList.add('image-viewer-nav-left');
  navLeft.style.opacity = '0';
  imageViewerNav.appendChild(navLeft);
  imageViewerNav.classList.add('image-viewer-nav');
  const navRight = document.createElement('button');
  navRight.classList.add('image-viewer-nav-right');
  navRight.style.opacity = '0';
  imageViewerNav.appendChild(navRight);
  adjustNavButtonVisibility(pictures, currentImagePos, navLeft, navRight);

  const imageViewer = document.createElement('div');
  imageViewer.classList.add('image-viewer-image');
  imageViewer.style.opacity = '0';

  function navigate() {
    // switch image
    adjustNavButtonVisibility(pictures, currentImagePos, navLeft, navRight);
    document.getElementById(PICTURE_ID).remove();
    const picture = pictures[currentImagePos].cloneNode(true);
    picture.id = PICTURE_ID;
    picture.style.opacity = '1';
    imageViewer.appendChild(picture);

    // update infobar
    imageViewerInfobar.innerText = `${currentImagePos + 1} / ${pictures.length}`;
  }

  navLeft.addEventListener('click', () => {
    if (currentImagePos - 1 >= 0) {
      currentImagePos -= 1;
      navigate();
    }
  });

  navRight.addEventListener('click', () => {
    if (currentImagePos + 1 < pictures.length) {
      currentImagePos += 1;
      navigate();
    }
  });

  const picture = e.currentTarget.cloneNode(true);
  picture.id = PICTURE_ID;

  // build image viewer
  imageViewer.appendChild(picture);
  imageViewerWrapper.appendChild(imageViewerInfobar);
  imageViewerWrapper.appendChild(imageViewerToolbar);
  imageViewerWrapper.appendChild(imageViewer);
  imageViewerWrapper.appendChild(imageViewerNav);
  imageViewerWrapper.appendChild(imageViewerBackground);
  block.parentElement.appendChild(imageViewerWrapper);

  setTimeout(() => {
    imageViewer.style.opacity = '1';
    imageViewerBackground.removeAttribute('style');
    imageViewerToolbar.removeAttribute('style');
    navLeft.style.opacity = '1';
    navRight.style.opacity = '1';
  }, 0);
  closeButton.addEventListener('click', () => {
    imageViewer.style.opacity = '0';
    imageViewerBackground.style.opacity = '0';
    imageViewerToolbar.style.opacity = '0';
    navLeft.style.opacity = '0';
    navRight.style.opacity = '0';
    setTimeout(() => {
      imageViewerWrapper.remove();
    }, 250);
  });
}
