'use strict';

// Перетаскивание диалогового окна и артефактов
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload'); // Находим  элемент, за который будем тащить наш диалог upload.
  var dragged = false; // Устанавливаем флаг для решения конфликта между добавлением аватарки и перетаскиванием т.к.оба действия производятся при клике на один и тотже элемент
  var startCoords = { // Начальные координаты точки курсора, с которой мы начали перемещать диалог.
    x: 0,
    y: 0
  };
  var onMouseDown = function (evtMouseDown) {
    evtMouseDown.preventDefault();
    startCoords = { // Координаты точки, с которой мы начали перемещать диалог.
      x: evtMouseDown.clientX,
      y: evtMouseDown.clientY
    };
    return startCoords;
  };

  // Функция вычисления координат от смещения
  var onMouseMove = function (evtMouseMove) {
    evtMouseMove.preventDefault();

    var shift = {
      x: startCoords.x - evtMouseMove.clientX,
      y: startCoords.y - evtMouseMove.clientY
    };

    startCoords = {
      x: evtMouseMove.clientX,
      y: evtMouseMove.clientY
    };

    setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
    setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

  };

  // Функция сброса обработчика события движения и отпускания мыши
  var onMouseUp = function (evtMouseUp) {
    evtMouseUp.preventDefault();

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

  dialogHandler.addEventListener('mousedown', function (evtMouseDown) { // обработаем событие начала перетаскивания нашегодиалога mousedown.
    evtMouseDown.preventDefault();
    dragged = true; // выбор аватара — это нажатие без перемещения, а если мы нажали и начали двигать курсор,то действие выбора файла надо отменить

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
