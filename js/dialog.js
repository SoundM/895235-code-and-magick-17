'use strict';

// Перетаскивание диалогового окна и артефактов
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload'); // Находим  элемент, за который будем тащить наш диалог upload.

  dialogHandler.addEventListener('mousedown', function (evt) { // обработаем событие начала перетаскивания нашегодиалога mousedown.
    evt.preventDefault();

    var startCoords = { // Координаты точки, с которой мы начали перемещать диалог.
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false; // Устанавливаем флаг для решения конфликта между добавлением аватарки и перетаскиванием т.к.оба действия производятся при клике на один и тотже элемент

    // Функция вычисления координат от смещения
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true; // выбор аватара — это нажатие без перемещения, а если мы нажали и начали двигать курсор,то действие выбора файла надо отменить

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    // Функция сброса обработчика события движения и отпускания мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (moveEvt) {
          moveEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
