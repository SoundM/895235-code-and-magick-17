'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215,' +
  ' 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var NUMBER_OF_WIZARD = 4;

  var similarListElement = document.querySelector('.setup-similar-list'); // Список, в который вставляем похожих магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); // Шаблон, который копируем


  // Функция создания массива случайных магов
  var createRandomWizard = function (firstName, lastName, coatColor, eyesColor) {
    var wizard = [];
    for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
      wizard.push({
        name: window.util.getRandomArrayItem(firstName),
        lastName: window.util.getRandomArrayItem(lastName),
        coatColor: window.util.getRandomArrayItem(coatColor),
        eyesColor: window.util.getRandomArrayItem(eyesColor)
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
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  renderMags();

  // Изменение цветов элементов мага игрока
  var currentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var currentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var currentWizardFireball = document.querySelector('.setup-fireball-wrap');


  var counter = window.util.makeCounter();

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
    var currentWizardEyesColor = window.util.getRandomArrayItem(EYES_COLORS);
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
})();
