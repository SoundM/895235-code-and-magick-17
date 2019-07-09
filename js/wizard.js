'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215,' +
  ' 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

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
    coatColor = currentWizardCoatColor;
    window.similar.onCoatChange(currentWizardCoatColor);
  });


  // Изменение цвета глаз по нажатию (случайным образом)
  currentWizardEyes.addEventListener('click', function () {
    var currentWizardEyesColor = window.util.getRandomArrayItem(EYES_COLORS);
    currentWizardEyes.style.fill = currentWizardEyesColor;
    eyesColor = currentWizardEyesColor;
    window.similar.onEyesChange(currentWizardEyesColor);
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

  window.wizard = {
    coatColor: coatColor,
    eyesColor: eyesColor
  };

})();
