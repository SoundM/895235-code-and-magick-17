'use strict';

window.util = (function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
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
    resetPosition(setup);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      closePopup();
    }
  });

  // Функция сбрасывания положения окна диалога в первоначальное состояние
  function resetPosition(element) {
    element.style.top = '';
    element.style.left = '';
  }

  return {

    // Функция получения элемента массива со случайным порядковым индексом
    getRandomArrayItem: function (array) {
      var i = Math.floor(Math.random() * array.length);
      return array[i];
    },

    // Создадим независимый счетчик с различными методами
    makeCounter: function () {
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
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },


    successHandler: function () {
      setup.classList.add('hidden');
    }
  };


})();
