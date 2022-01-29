import i18Obj from './translate.js';


//-----------------------------------------------------------------

//?variables

const hamburger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.menu-list');
const language = document.querySelector('.languages');
const langBtn = document.querySelectorAll('.lang');
const colorTheme = document.querySelector('.color-theme');
const sun = document.querySelector('.light');
const moon = document.querySelector('.dark');
const switchBtnsContainer = document.querySelector('.switch-container');
const switchBtn = document.querySelectorAll('.switch-btn');
const galleryImg = document.querySelectorAll('.gallery-img');


const ligthThemeElsImg = ['.main-image', '.contacts'];
const collectionElsImg = ligthThemeElsImg.map((el) => document.querySelector(el));

const ligthThemeEls = ['.body', '.logo-img', '.lang', '.burger-line', '.menu', '.menu-item', '.main-btn', '.section-title', '.title-text', '.switch-btn', '.price-btn', '.form-input', '.order-message', '.contacts-btn', '.social-link'];
const collectionEls = ligthThemeEls.map((el) => document.querySelectorAll(el));


//-----------------------------------------------------------------

//?burger

  if (burger) {
    hamburger.addEventListener('click', function(event){
      document.body.classList.toggle('lock')
      hamburger.classList.toggle('active');
      menu.classList.toggle('open');
    });
  }

function closeMenu(event) {
  if (event.target.classList.contains('menu-item')) {
    document.body.classList.remove('lock')
    hamburger.classList.remove('active');
    menu.classList.remove('open');
  }
}

nav.addEventListener('click', closeMenu);
//-----------------------------------------------------------------


//? switch-gallery & switch-active buttons

function changeImage(event) {
    if(event.target.classList.contains('switch-btn')) {
      galleryImg.forEach((img, index) => img.src = `assets/jpg/${event.target.dataset.season}/${index + 1}.jpg`);

      switchBtn.forEach((btn) => btn.classList.remove('active'));
      switchBtn.forEach((btn) => {
        if (event.target.dataset.season === btn.dataset.season) btn.classList.add('active');
      })
  }
}
switchBtnsContainer.addEventListener('click', changeImage);

//-----------------------------------------------------------------


//? translate

function getTranslate(event) {
    let langClicked = event.target.textContent.toLowerCase();
    const dataI18n = document.querySelectorAll('[data-i18n]');
    dataI18n.forEach((el) => el.textContent = i18Obj[langClicked][el.dataset.i18n]);


    langBtn.forEach((btn) => btn.classList.remove('active'));
    // console.log(event.target.dataset.language); // получили data-значение атрибута кнопки, по которой кликнули
    langBtn.forEach((btn) => {
      if (event.target.dataset.language === btn.dataset.language) btn.classList.add('active');
    })
}

language.addEventListener('click', getTranslate);

//-----------------------------------------------------------------

//? change color theme

function changeTheme(event) {
  if(event.target.classList.contains('color-theme-link')) {
    collectionEls.map((el) => el.forEach((el) => el.classList.toggle('light-theme')));
    collectionElsImg.forEach((el) => el.classList.toggle('change-img'));
  }
}

function changeIconColorTheme() {
  sun.addEventListener('click', () => {
    sun.classList.add('hidden');
    moon.classList.remove('hidden');
  })

  moon.addEventListener('click', () => {
    sun.classList.remove('hidden');
    moon.classList.add('hidden');
  })
}
changeIconColorTheme();

colorTheme.addEventListener('click', changeTheme);

//-----------------------------------------------------------------
