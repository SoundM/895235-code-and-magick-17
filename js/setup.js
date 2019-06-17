'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215,' +
' 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var NUMBER_OF_WIZARD = 4;
var KeyCodeEnum = {
  ESC: 27,
  ENTER: 13,
};


var similarListElement = document.querySelector('.setup-similar-list'); // Список, в который вставляем похожих магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item'); // Шаблон, который копируем

// Функция получения элемента массива со случайным порядковым индексом
var getRandomArrayItem = function (array) {
  var i = Math.floor(Math.random() * array.length);
  return array[i];
};

// Функция создания массива случайных магов
var createRandomWizard = function (firstName, lastName, coatColor, eyesColor) {
  var wizard = [];
  for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
    wizard.push({
      name: getRandomArrayItem(firstName),
      lastName: getRandomArrayItem(lastName),
      coatColor: getRandomArrayItem(coatColor),
      eyesColor: getRandomArrayItem(eyesColor)
    });
  }
  return wizard;
};

// Создаем элемент шаблона
var createWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция создания массива магов и DOM элементов
var renderMags = function () {
  var fragment = document.createDocumentFragment(); // Создаем пустой DOM элемент
  var wizards = createRandomWizard(WIZARD_NAMES, WIZARD_LAST_NAMES, COAT_COLORS, EYES_COLORS);// Массив магов

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }
  similarListElement.appendChild(fragment); // Отрисуем шаблон в документ.
};

renderMags();

// Нажатие на элемент .setup-open удаляет класс hidden у блока setup
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === KeyCodeEnum.ESC) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodeEnum.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCodeEnum.ENTER) {
    closePopup();
  }
});

// Изменение цветов элементов мага игрока
var currentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var currentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var currentWizardFireball = document.querySelector('.setup-fireball-wrap');

// Создадим независимый счетчик с различными методами
function makeCounter() {
  var currentCount = 0;

  function counter() {
    return currentCount++; // Собственно сам счетчик
  }

  counter.set = function (value) { // Метод позволяет включить счетчик на заданом значении
    currentCount = value;
  };

  counter.reset = function () { // Метод обнуления счетчика
    currentCount = 0;
  };

  return counter;
}

var counter = makeCounter();

// Изменение цвета мантии по нажатию (по-порядку цветов в массиве)
currentWizardCoat.addEventListener('click', function () {
  var clickCounter = counter();
  if (clickCounter === COAT_COLORS.length) {
    clickCounter = counter.reset();
  }
  var currentWizardCoatColor = COAT_COLORS[clickCounter];
  currentWizardCoat.style.fill = currentWizardCoatColor;
  document.querySelector('input[name="coat-color"]').value = currentWizardCoatColor;
});

// Изменение цвета глаз по нажатию (случайным образом)
currentWizardEyes.addEventListener('click', function () {
  var currentWizardEyesColor = getRandomArrayItem(EYES_COLORS);
  currentWizardEyes.style.fill = currentWizardEyesColor;
  document.querySelector('input[name="eyes-color"]').value = currentWizardEyesColor;
});

// Изменение цвета фаербола по нажатию (как элемент массива по остатку от деления клика на длину массива цветов)
currentWizardFireball.addEventListener('click', function () {
  var clickCounter = counter();
  if (clickCounter === FIREBALL_COLORS.length) {
    clickCounter = counter.reset();
  }
  var currentWizardFireballColor = FIREBALL_COLORS[clickCounter % FIREBALL_COLORS.length];
  currentWizardFireball.style.backgroundColor = currentWizardFireballColor;
  document.querySelector('input[name="fireball-color"]').value = currentWizardFireballColor;
});
