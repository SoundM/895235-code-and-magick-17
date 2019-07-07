'use strict';
// код, который рисует одного мага

(function () {
  var NUMBER_OF_WIZARD = 4;

  var similarListElement = document.querySelector('.setup-similar-list'); // Список, в который вставляем похожих магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content;
  // .querySelector('.setup-similar-item'); // Шаблон, который копируем

  // Создаем элемент шаблона
  var createWizardElement = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Функция создания массива магов и DOM элементов
  var getWizardsHandler = function (data) {
    var takeNumber = data.length > NUMBER_OF_WIZARD ? NUMBER_OF_WIZARD : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(createWizardElement(data[i]));
    }
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = {
    getWizardsHandler: getWizardsHandler
  };

})();
