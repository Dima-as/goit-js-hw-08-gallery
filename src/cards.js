
import galleryItems from "./app.js"

const refs={
  galleryList:document.querySelector(".js-gallery"),
  modal:document.querySelector('.js-lightbox'),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  images:document.querySelector('.lightbox__image'),
  overlay:document.querySelector('.lightbox__overlay')
}
const {galleryList,modal,btn,images,overlay}=refs

const markup = createItems(galleryItems)
galleryList.insertAdjacentHTML("afterbegin", markup);

function createItems(array){
  return array.map(({preview,original,description})=>{
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}" />
  </a>
</li>
    `
  }).join('')
}


galleryList.addEventListener('click', onOpenModalBtn);
btn.addEventListener('click', closeModalBtn);
overlay.addEventListener('click',onOverlayClose);

function onOpenModalBtn (event){
  window.addEventListener('keydown',onEscKeydown)
   const isGalleryImage = event.target.classList.contains('gallery__image')
   if (!isGalleryImage) {
    return;
  }
   event.preventDefault()
   modal.classList.add('is-open');
   images.src = event.target.dataset.source;
   images.alt = event.target.alt;

}

function closeModalBtn (event){
  window.removeEventListener('keydown',onEscKeydown)
  modal.classList.remove("is-open");
  images.src = "";
    images.alt = "";
}

function onOverlayClose (event){
  if (event.target.nodeName !=='DIV' ) {
    return
  }
  closeModalBtn ()
}

function onEscKeydown(event){
   console.log(event.code);
  if (event.code !== 'Escape') {
    return
  }
   closeModalBtn ()
}