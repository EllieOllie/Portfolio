const check = String.fromCodePoint(0x2714);
const font = 'color: #ff746f; font-family: Roboto; font-size: 16px; font-weight: 400;'
const font1 = 'color: #bbbbbb; font-family: Roboto; font-size: 14px; font-weight: 400;'
const font2 = 'color: #a9d8d2; font-family: Roboto; font-size: 14px; font-weight: 400;'

console.log(`%cПривет!
Я постаралась выполнить все требования!
Для удобства навигации, иконка фотоаппрарата в левом верхнем углу используется как кнопка "наверх"`, `${font2}`);

console.log(`%cScore: 85 / 85`, `${font}`)

console.log(`%c[+] Смена изображений в секции portfolio +25  ${check}
[+] Перевод страницы на два языка +25  ${check}
[+] Переключение светлой и тёмной темы +25  ${check}
[+] local storage +5  ${check}
[+] Cложные эффекты для кнопок при наведении +5  ${check}`, `${font1}`);
