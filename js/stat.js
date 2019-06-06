'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_START_X = 50;
var TEXT_START_Y1 = 30;
var TEXT_START_Y2 = 50;
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

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);
  var startInfoX = CLOUD_X + TEXT_START_X;
  var startInfoY = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP;
  var scaleX = ((CLOUD_WIDTH - TEXT_START_X) / players.length);
  var scaleY = BAR_HEIGHT / maxTime;

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_START_X, TEXT_START_Y1);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_START_X, TEXT_START_Y2);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    if (players[i] !== 'Вы') {
      var saturationBlue = getRandomInteger(0, 100) + '%';
      ctx.fillStyle = 'hsl(220, ' + saturationBlue + ', 50%';
    }
    ctx.fillRect(startInfoX + scaleX * i, startInfoY - GAP - scaleY * times[i], BAR_WIDTH, scaleY * times[i]);

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], startInfoX + scaleX * i, startInfoY);
    ctx.fillText(Math.round(times[i]), startInfoX + scaleX * i, startInfoY - GAP - scaleY * times[i] - GAP - FONT_GAP);

  }
};
