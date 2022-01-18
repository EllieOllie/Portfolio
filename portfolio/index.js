console.log('Score: 110 / 110');
console.log('[+] Вёрстка валидная (10)');
console.log('[+] Вёрстка семантическая (20)');
console.log('[+] Вёрстка соответствует макету (48)');
console.log('[+] Требования к css (12)');
console.log('[+] Интерактивность, реализуемая через css (20)');


//?burger

const hamburger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.menu-list');

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
