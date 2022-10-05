
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var r = void 0,
        g = void 0,
        b = void 0;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    var toHex = function toHex(x) {
        var hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

window.onload = function () {
    let stopProp = function (ev) {
        ev.stopPropagation();
    }

    var colorElement = document.getElementById("color");
    colorElement.addEventListener("click", stopProp, false);
    colorElement.addEventListener("mousedown", stopProp, false);

    var setFavicon = function (hex) {
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = hex;
        ctx.fillRect(0, 0, 16, 16);
        document.getElementsByTagName('link')[0].href = canvas.toDataURL("image/x-icon");
    }

    var setRandomColor = function setRandomColor() {
        var h = void 0,
            s = void 0,
            l = void 0;

        h = randomInt(0, 359);
        s = randomInt(55, 75);
        l = randomInt(40, 60);

        document.documentElement.style.setProperty('--color', 'hsl(' + h + ', ' + s + '%, ' + l + '%)');
        var hex = hslToHex(h, s, l);
        document.title = hex;
        colorElement.innerHTML = hex;
        document.documentElement.style.setProperty('--color-transparent', hex + '22');

        setFavicon(hex);
    };
    setRandomColor();

    var body = document.getElementsByTagName("body")[0];
    body.addEventListener("mousedown", function (ev) {
        ev.preventDefault();
    });
    body.addEventListener("click", function () {
        setRandomColor();
    }, false);
};