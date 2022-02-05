import i18Obj from './translate.js';

//-----------------------------------------------------------------
const body = document.querySelector('.body');
//-----------------------------------------------------------------

  //?burger

  const hamburger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.menu-list');

    if (burger) {
      hamburger.addEventListener('click', function(){
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

  //? func change class to "active"

  function changeClassActive(nodeList, data) {
    nodeList.forEach((btn) => (data === btn.dataset.i18n) ? btn.classList.add('active') : btn.classList.remove('active'));
  }

  //-----------------------------------------------------------------
  //? switch-gallery & switch-active buttons

  let seasonDefault = 'autumn';
  const switchBtnsContainer = document.querySelector('.switch-container');
  const switchBtn = document.querySelectorAll('.switch-btn');
  const galleryImg = document.querySelectorAll('.gallery-img');

  function changeImage(season) {
    galleryImg.forEach((img, index) => {
      img.style.animation = 'changeOpacity 1s ease';
      setTimeout(() => img.style.animation = '', 1500);
      img.src = `assets/jpg/${season}/${index + 1}.jpg`;
    })
    changeClassActive(switchBtn, season);
  }

  switchBtnsContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('switch-btn')) {
      seasonDefault = event.target.dataset.season;
      changeImage(seasonDefault);
    }
  });

  //-----------------------------------------------------------------
  //? cash images

  const seasons = ['winter', 'spring', 'summer', 'autumn'];

  function preloadImages(season) {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `assets/jpg/${season}/${i}.jpg`;
    }
  }
  seasons.forEach(season => preloadImages(season));


  //-----------------------------------------------------------------
  //? translate
  let languageDefault = 'en';
  const lang = document.querySelector('.languages');
  const langBtn = document.querySelectorAll('.lang');

  function getTranslate(language) {
      const dataI18n = [...document.querySelectorAll('[data-i18n]')];

      dataI18n.map((el) => {
        // проверка на соответствие ключей в объекте i18Obj с data-атрибутами из коллекции
        if (Object.keys(i18Obj[language]).find((item) => item === el.dataset.i18n)) {
          el.style.animation = 'changeOpacity 1s ease';
          setTimeout(() => el.style.animation = '', 1500);
          el.textContent = i18Obj[language][el.dataset.i18n];
        }
        if (el.placeholder) {
          el.placeholder = i18Obj[language][el.dataset.i18n];
          el.textContent = '';
        }
      })

      langBtn.forEach((btn) => (language === btn.dataset.language) ? btn.classList.add('active') : btn.classList.remove('active'));
      // changeClassActive(langBtn, language); // НЕ РАБОТАЕТ!!!
  }

  lang.addEventListener('click', (event) => {
    if(event.target.classList.contains('lang')) {
    languageDefault = event.target.dataset.language;
    // console.log(event.target.dataset.language); // получили data-значение атрибута кнопки, по которой кликнули
    getTranslate(languageDefault);
    localStorage.setItem('lang', languageDefault);
    }
  });

  //-----------------------------------------------------------------
  //? change color theme

  let themeDefault = 'light';

  const ligthThemeElsImg = ['.hero', '.contacts'];
  const collectionElsImg = ligthThemeElsImg.map((el) => document.querySelector(el));

  const ligthThemeEls = ['.body', '.logo-img', '.color-theme-link', '.lang', '.burger-line', '.menu', '.menu-item', '.main-btn', '.section-title', '.title-text', '.switch-btn', '.price-title', '.price-btn', '.form-input', '.order-message', '.contacts-btn', '.social-link'];
  const collectionEls = ligthThemeEls.map((el) => document.querySelectorAll(el));

  const colorTheme = document.querySelector('.color-theme');
  let svg = document.querySelector('.sun');

  //смена иконки смены темы
  function changeIconColorTheme() {
    if (body.classList.contains('light-theme')) {
      svg.href.baseVal = "assets/svg/sprite.svg#moon";
    } else {
      svg.href.baseVal = "assets/svg/sprite.svg#sun";
    }
  }

  function changeTheme() {
    collectionEls.map((el) => el.forEach((el) => {
      el.style.animation = 'changeOpacity 1s linear';
      setTimeout(() => el.style.animation = '', 1500);
      el.classList.toggle('light-theme');
    }));
    collectionElsImg.forEach((el) => el.classList.toggle('change-img'));

    changeIconColorTheme();
    // проверка
    body.classList.contains('light-theme') ? themeDefault = 'light' : themeDefault = 'dark';
    return themeDefault;
  }

  colorTheme.addEventListener('click',(event) => {
    if(event.target.classList.contains('color-theme-link')) {
      changeTheme();
      localStorage.setItem('theme', themeDefault);
    }
  });

  //-----------------------------------------------------------------
  //? local Storage

  function getLocalStorage() {
    if(localStorage.getItem('lang')) {
      languageDefault = localStorage.getItem('lang');
      getTranslate(languageDefault);
    }
    if(localStorage.getItem('theme')) {
      themeDefault = localStorage.getItem('theme');
        if (themeDefault === 'light') {
          changeTheme(themeDefault);
        }
    }
  }
  window.addEventListener('load', getLocalStorage)
