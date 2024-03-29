'use strict';

(function () {
  var OK_STATUS = 200;
  var TIMEOUT = 10000;

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    createRequest('GET', URL, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    createRequest('POST', URL, onLoad, onError, data);
  };


  function createRequest(method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save
  };

})();
