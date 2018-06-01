'use strict'
var ctx;
var th;
var thPlus;
var noiseRange;
var noisePivot;
var prevY = 0;

var theta;
window.onload = function () {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        th = 0;
        thPlus = 0.1;
        noiseRange = {
            min: -10,
            max: 10
        };
        noisePivot = 0;
        requestAnimationFrame(sinCurve);
    }
}

function sinCurve() {
    ctx.clearRect(0, 0, 300, 300);
    th %= 2 * Math.PI;
    th += thPlus;
    noisePivot++;
    noisePivot %= 300 - noiseRange.min;
    for (var i = 0; i < 300; i += 1) {
        var y = Math.sin((i / 150) * Math.PI + th) * 30;
        var scale = Math.exp(-1 * Math.pow(((i - 150) / 70), 2));
        if (noisePivot + noiseRange.min <= i && i <= noisePivot + noiseRange.max) {
            var j = i - noisePivot - noiseRange.min;
            var deltaScale = Math.pow(Math.exp(-1 * Math.pow(((j - 10) / 20), 2)) * 2, 5) - 10;
            y += Math.sin((i * 20 / 150) * Math.PI + th) * deltaScale * deltaScale / 10;
        }
        y *= scale;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(i, 100 + prevY);
        ctx.lineTo(i, 100 + y + 2);
        ctx.stroke();
        prevY = y;
        // ctx.ellipse(i, y, 5, 5, 0, 0, 2 * Math.PI);
    }
    theta = fakeRandomWalk(theta);
    ctx.fillRect(5, 5, 5, 5);
    requestAnimationFrame(sinCurve);
}


function fakeRandomWalk(theta) {
    theta %= 360;
    let rand = Math.random() - 0.5;
    return theta + rand;
}