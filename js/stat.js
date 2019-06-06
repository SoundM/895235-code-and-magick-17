'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_START_X = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH + 30, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x - 30, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_START_X, 30);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_START_X, 50);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    if (players[i] !== 'Вы') {
      var saturationBlue = function () {
        return 'hsl(220, ' + Math.floor(Math.random() * 101) + '%, 50%';
      };
      ctx.fillStyle = saturationBlue();
    }
    ctx.fillRect(CLOUD_X + TEXT_START_X + ((CLOUD_WIDTH - TEXT_START_X) / players.length) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP - (BAR_HEIGHT * times[i] / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i] / maxTime));

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + TEXT_START_X + ((CLOUD_WIDTH - TEXT_START_X) / players.length) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + TEXT_START_X + ((CLOUD_WIDTH - TEXT_START_X) / players.length) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP - (BAR_HEIGHT * times[i] / maxTime) - GAP - FONT_GAP);

  }
};
