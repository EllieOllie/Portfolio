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

  //? local Storage-----------------------------------------------------------------

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
  window.addEventListener('load', getLocalStorage);

  //? custom video-player------------------------------------------------------------

  const videoContainer = document.querySelector('.video-container');
  const video = videoContainer.querySelector('.viewer');
  const playBtn = videoContainer.querySelector('.play-btn');
  const controls = videoContainer.querySelector('.player-controls');
  const progress = videoContainer.querySelector('.progress');
  const progressFill = videoContainer.querySelector('.progress-fill');
  const playBtnToggle = videoContainer.querySelector('.play-toggle');
  const playIcon = videoContainer.querySelector('.player-icon');
  const timer = videoContainer.querySelector('.timer');
  const videoDuration = videoContainer.querySelector('.video-duration');
  const volumeBtn = videoContainer.querySelector('.volume-btn');
  const volumeIcon = videoContainer.querySelector('.volume-icon');
  const rangeVolume = videoContainer.querySelector('.player-volume');


  function playVideo () {
    const videoToggle = video.paused ? 'play' : 'pause';
    video[videoToggle]();
  }

  function changePlayBtn () {
    if (video.paused) {
      playIcon.firstElementChild.setAttribute('xlink:href', 'assets/svg/sprite_video.svg#play2');
      playBtn.classList.remove('hidden');
      controls.classList.remove('show');
    } else {
      playIcon.firstElementChild.setAttribute('xlink:href', 'assets/svg/sprite_video.svg#pause');
      playBtn.classList.add('hidden');
      controls.classList.add('show');
    }
  }

  // volume update
  function handleRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
  }
//!--------------

let volumeValue = rangeVolume.value;

  function handleChangeVolume () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${value*100}%, var(--color-white) ${value*100}%,  var(--color-white) 100%)`;

    if (+(rangeVolume.value) === 0) {
      volumeIcon.firstElementChild.setAttribute('xlink:href', 'assets/svg/sprite_video.svg#mute');
    } else {
      volumeIcon.firstElementChild.setAttribute('xlink:href', 'assets/svg/sprite_video.svg#volume');
    }
  }

  function muteVolume() {
    if (video.muted) {
      rangeVolume.value = volumeValue;
      video.muted = false;
      volumeIcon.firstElementChild.setAttribute('xlink:href', 'assets/svg/sprite_video.svg#volume');
      rangeVolume.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${volumeValue*100}%, var(--color-white) ${volumeValue*100}%,  var(--color-white) 100%)`;
    } else {
      rangeVolume.value = 0;
      video.muted = true;
      volumeIcon.firstElementChild.setAttribute('xlink:href', 'assets/svg/sprite_video.svg#mute');
      rangeVolume.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${volumeValue}%, var(--color-white) ${volumeValue}%,  var(--color-white) 100%)`;
    }
  }

//!-----------------------------------------------

  function fillProgressVideo() {
    // console.log(video.currentTime);
    const percent = (video.currentTime / video.duration) * 100;
    progressFill.style.flexBasis = `${percent}%`;

    // current time
    let currentMinutes = Math.floor(video.currentTime / 60);
    if (currentMinutes < 10) currentMinutes = `0${currentMinutes}`;
    let currentSeconds = Math.floor(video.currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    timer.innerHTML = `${currentMinutes}:${currentSeconds}`;

    // video duration
    let durationMinutes = Math.floor(video.duration / 60);
    if (durationMinutes < 10) durationMinutes = `0${durationMinutes}`;
    let durationSeconds = Math.floor(video.duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    videoDuration.innerHTML = `${durationMinutes}:${durationSeconds}`;
  }

  function handleClickProgress(event) {
    // console.log(event);
    const dragOver = (event.offsetX / progress.offsetWidth) * video.duration;
    // console.log(video.duration);
    video.currentTime = dragOver;
  }


  //! не корректно работает!!!! Keypress (Play/Pause)
  // window.addEventListener('keydown', (event) => {
  //   if (event.keyCode === 32) playVideo();
  //   });


  video.addEventListener('click', playVideo);
  video.addEventListener('play', changePlayBtn);
  video.addEventListener('pause', changePlayBtn);
  video.addEventListener('timeupdate', fillProgressVideo);

  playBtnToggle.addEventListener('click', playVideo);

  playBtn.addEventListener('click', playVideo);

  volumeBtn.addEventListener('click', muteVolume);

  rangeVolume.addEventListener('change', handleRangeUpdate);
  rangeVolume.addEventListener('mousemove', handleRangeUpdate);
  rangeVolume.addEventListener('input', handleChangeVolume);


  let mousedown = false;
  progress.addEventListener('click', handleClickProgress);
  progress.addEventListener('mousemove', (event) => mousedown && handleClickProgress(event));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);

  //?--------------------------------------------------------------------------------
