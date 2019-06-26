'use strict';

// перетаскивание в рюкзак
// Drag and drop https://developer.mozilla.org/ru/docs/Web/Guide/HTML/Drag_and_drop
// http://gearmobile.github.io/javascript/javascript-drag-and-drop/

// Если звезды две, то в сумке они могут лечь в одну ячейку((
(function () {

  var artifactShop = document.querySelector('.setup-artifacts-shop'); // находим блок "магазин"
  var draggedArtifact = null;

  artifactShop.addEventListener('dragstart', function (evt) { // пользователь начинает перетаскивание элемента
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedArtifact = evt.target; // Ссылка на объект, который был инициатором события
      evt.dataTransfer.setData('text/plain', evt.target.alt); // dataTransfer.setData(format, data): добавляет данные в нужном формате.
    }
  });

  var artifactsBag = document.querySelector('.setup-artifacts'); // находим блок "сумка"

  artifactsBag.addEventListener('dragover', function (evt) { // Данное событие срабатывает каждые несколько сотен милисекунд, когда перемещаемый элемент оказывается над зоной, принимающей перетаскиваемые элементы.
    evt.preventDefault();
    return false;
  });

  artifactsBag.addEventListener('drop', function (evt) { // вызывается для элемента, над которым произошло "сбрасывание" перемещаемого элемента. Событие отвечает за извлечение "сброшенных" данных и их вставку. Событие будет срабатывать только при завершении операции перетаскивания, например, событие не сработает, если пользователь отменит перетаскивание нажатием Esc, или не донесет элемент, до цели
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedArtifact);
  });

  artifactsBag.addEventListener('dragenter', function (evt) { //  dragenter Срабатывает, когда перемещаемый элемент
    // попадает на элемент-назначение. Обработчик этого события показывает, что элемент находится над объектом на
    // который он может быть перенесен. используется для того, чтобы подсветить либо промаркировать объект над которым происходит перемещения в случае, если перемещение на данный элемент разрешено.
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsBag.addEventListener('dragleave', function (evt) { // dragleave Это событие запускается в момент
    // перетаскивания, когда курсор мыши выходит за пределы элемента. Обработчикам следует убрать любую подсветку или иные индикаторы, указывавшие на присутствие курсора, чтобы тем самым обозначить реакцию на прекращение перетаскивания.
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsBag.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedArtifact = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactShop.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactShop.addEventListener('drop', function (evt) {
    if (evt.target.classList.contains('setup-artifacts-cell')) {
      evt.target.style.backgroundColor = '';
      evt.target.appendChild(draggedArtifact);
    }
  });

  artifactShop.addEventListener('dragenter', function (evt) {
    if (evt.target.classList.contains('setup-artifacts-cell')) {
      evt.target.style.backgroundColor = 'yellow';
      evt.preventDefault();
    }
  });

  artifactShop.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
