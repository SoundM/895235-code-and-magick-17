'use strict';
(function () {

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.wizard.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.wizard.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.getWizardsHandler(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onCoatChange = window.util.debounce(function (color) {
    window.wizard.coatColor = color;
    updateWizards();
  });

  var onEyesChange = window.util.debounce(function (color) {
    window.wizard.eyesColor = color;
    updateWizards();
  });


  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.util.errorHandler);

  window.similar = {
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange
  };

})();
