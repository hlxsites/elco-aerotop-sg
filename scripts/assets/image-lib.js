const PICTURE_ID = 'image-viewer-picture';
function generateImage(sourceElement) {
  const picture = document.createElement('picture');
  let width = 0;
  let height = 0;
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
        width = picSrc.getAttribute('width');
        height = picSrc.getAttribute('height');
        picture.appendChild(img);
        break;
      }
      default:
    }
  });
  return { picture, width, height };
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

function adjustPreviewSize(imageViewer, width, height) {
  let imgWidth = width > window.innerWidth ? window.innerWidth : width;
  let imgHeight = (height / width) * imgWidth;

  if (imgHeight > window.innerHeight) {
    imgHeight = window.innerHeight;
    imgWidth = (width / height) * imgHeight;
  }

  imageViewer.style.width = `${imgWidth}px`;
  imageViewer.style.top = `${(window.innerHeight / 2) - (imgHeight / 2)}px`;
  imageViewer.style.left = `${(window.innerWidth / 2) - (imgWidth / 2)}px`;
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

  const startBoundaries = e.currentTarget.getBoundingClientRect();
  const imageViewer = document.createElement('div');
  imageViewer.classList.add('image-viewer-image');
  imageViewer.style.width = `${startBoundaries.width}px`;
  imageViewer.style.top = `${startBoundaries.top}px`;
  imageViewer.style.left = `${startBoundaries.left}px`;
  imageViewer.style.opacity = '0';

  function navigate() {
    // switch image
    adjustNavButtonVisibility(pictures, currentImagePos, navLeft, navRight);
    document.getElementById(PICTURE_ID).remove();
    const { picture } = generateImage(pictures[currentImagePos]);
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

  if (e.currentTarget.tagName === 'PICTURE') {
    const { picture, width, height } = generateImage(e.currentTarget);

    // build image viewer
    imageViewer.appendChild(picture);
    imageViewerWrapper.appendChild(imageViewerInfobar);
    imageViewerWrapper.appendChild(imageViewerToolbar);
    imageViewerWrapper.appendChild(imageViewer);
    imageViewerWrapper.appendChild(imageViewerNav);
    imageViewerWrapper.appendChild(imageViewerBackground);
    block.parentElement.appendChild(imageViewerWrapper);

    window.addEventListener('resize', () => {
      adjustPreviewSize(imageViewer, width, height);
    });

    setTimeout(() => {
      adjustPreviewSize(imageViewer, width, height);
      imageViewer.style.opacity = '1';
      imageViewerBackground.removeAttribute('style');
      imageViewerToolbar.removeAttribute('style');
      navLeft.style.opacity = '1';
      navRight.style.opacity = '1';
    }, 0);
    closeButton.addEventListener('click', () => {
      const boundaries = block.getElementsByTagName('picture')[currentImagePos].getBoundingClientRect();
      imageViewer.style.width = `${boundaries.width}px`;
      imageViewer.style.top = `${boundaries.top}px`;
      imageViewer.style.left = `${boundaries.left}px`;
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
}
