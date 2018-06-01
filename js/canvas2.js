'use strict'

var ctx;
var backCtx;
var canvas;
var backCanvas
var img;
var DOMURL;
var uIntArray;
var png;
var url;

var th;
var thPlus;
var noiseRange;
var noisePivot;
var prevX = 0;
var theta;

var noisePool;
var noiseCount = 5;
var noiseCanvas;
var noiseCtx;

function noiseManager() {
    noisePool.push();
}

window.onload = function () {

    noisePool = new Array();

    XHRArrayBuffer('image/target2.png', (xhr) => {
        var data = xhr.response;
        xhr.abort();
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        backCanvas = document.getElementById("backCanvas");
        backCtx = backCanvas.getContext("2d");
        noiseCanvas = document.getElementById("noiseCanvas");
        noiseCtx = noiseCanvas.getContext("2d");
        DOMURL = self.URL || self.webkitURL || self;
        uIntArray = new Uint8ClampedArray(data);
        png = new Blob([uIntArray], {
            type: 'image/png'
        });
        url = DOMURL.createObjectURL(png);
        img = new Image();
        img.src = url;
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 200, 200);
            DOMURL.revokeObjectURL(png);
            th = 0;
            thPlus = 0.1;
            noiseRange = {
                min: -10,
                max: 10
            };
            noisePivot = 0;
            requestAnimationFrame(noise);
            // for (let i = 0; i < 200; i++) {
            //     backCtx.putImageData(ctx.getImageData(0, i, 200, 1), Math.random() * 10, i);
            // }
        };
    });

}

function noise() {
    backCtx.clearRect(0, 0, 200, 200);
    th %= 2 * Math.PI;
    th += thPlus;
    noisePivot++;
    noisePivot %= 200 - noiseRange.min;
    for (var i = 0; i < 200; i += 1) {
        var x = Math.sin((i / 100) * Math.PI + th * (0.5 - Math.random()) * Math.random() * 10) * 10 * (0.5 - Math.random());
        var scale = Math.exp(-1 * Math.pow(((i - 100) / 55), 2));
        if (noisePivot + noiseRange.min <= i && i <= noisePivot + noiseRange.max) {

            var j = i - noisePivot - noiseRange.min;
            var deltaScale = Math.pow(Math.exp(-1 * Math.pow(((j - 10) / 20), 2)) * 2, 4.5) - 50 * (0.5 - Math.random());
            x += Math.sin((i * 80 / 150) * Math.PI + th) * deltaScale * deltaScale / 100;
            x *= scale;
            backCtx.putImageData(ctx.getImageData(0, i, 200, 3), x, i);
            prevX = x;
            i += 2;

        } else {
            x *= scale;
            backCtx.putImageData(ctx.getImageData(0, i, 200, 1), x, i);
            prevX = x;
        }
        x *= scale;
        backCtx.putImageData(ctx.getImageData(0, i, 200, 1), x, i);
        prevX = x;

        noiseCtx.clearRect(0, 0, 200, 200);
        noiseCtx.strokeStyle = 'red';
        noiseCtx.beginPath();
        noiseCtx.moveTo(i, 100 + prevX);
        noiseCtx.lineTo(i, 100 + x + 2);
        noiseCtx.stroke();

    }
    // theta = fakeRandomWalk(theta);
    requestAnimationFrame(noise);
}

function fakeRandomWalk(theta) {
    return (theta % 360) + Math.random() - 0.5;
}