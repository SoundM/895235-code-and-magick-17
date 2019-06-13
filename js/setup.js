'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215,' +
' 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var NUMBER_OF_WIZARD = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var userSimilar = document.querySelector('.setup-similar');
userSimilar.classList.remove('hidden');

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
