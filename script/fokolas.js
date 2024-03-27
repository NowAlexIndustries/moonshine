
const minAlcoholSzazalek = 10;
const maxAlcoholSzazalek = 98;

const minHomerseklet = 5;
const maxHomerseklet = 30;

function validatePercent(event) {
    const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;
    const input = event.target.value;

    if (!decimalPattern.test(input)) {
        event.target.value = input.slice(0, -1); // Remove the last character (which is invalid)
    }

    event.target.value = event.target.value.replace(/^00+/, '0'); // remove leading zeros (except 1)

    // replace value to 100, if bigger than 100
    if (parseFloat(event.target.value) > 100) {
        ////////////////////
    }
}

function interpolate2DArray(data, x, y) {
    //bilinear interpolation, maybe switch to bicubic interpolation
    // Get the indices of the surrounding values
    const x0 = Math.floor(x);
    const x1 = Math.ceil(x);
    const y0 = Math.floor(y);
    const y1 = Math.ceil(y);

    // Get the values at the corners of the rectangle
    const topLeft = data[x0][y0];
    const topRight = data[x1][y0];
    const bottomLeft = data[x0][y1];
    const bottomRight = data[x1][y1];

    // Interpolate along the x-axis first
    const top = topLeft + (topRight - topLeft) * (x - x0);
    const bottom = bottomLeft + (bottomRight - bottomLeft) * (x - x0);

    // Interpolate along the y-axis
    const interpolatedValue = top + (bottom - top) * (y - y0);

    return interpolatedValue;
}

function mapRange(value, inputMin, inputMax, outputMin, outputMax) {
    return ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
}

const alc = 'az hofok';
const szaz = 'az alkoholszázalék';

const low = 'tul kicsi';
const big = 'tul nagy'

function higitasHandler(data, x, y, minX, maxX, minY, maxY) {
    
    let alcError = '';
    let xError = true;
    if (x < minX) {
        alcError = low + ' ' + alc;
    } else if (x > maxX) {
        alcError = big + ' ' + alc;
    } else {
        xError = false;
    }

    let szazError = '';
    let yError = true;
    if (y < minY) {
        szazError = low + ' ' + szaz;
    } else if (y > maxY) {
        szazError = big + ' ' + szaz;
    } else {
        szazError = false;
    }

    if (alcError && szazError) {
        //capitalize sentence with css
        return alcError + ' és ' + szazError + '!';
    }

    if (alcError) {
        return alcError + '!';
    }

    if (szazError) {
        return szazError + '!';
    }

    const x0 = mapRange(x, minX, maxX, 0, data.length);
    const y0 = mapRange(y, minY, maxY, 0, data[0].length);

    return interpolate2DArray(data, x0, y0);
}

function calculateFokolas() {
    let homerseklet = parseFloat(document.getElementById('measuredTemp').value);
    let mert_alkoholszazalek = parseFloat(document.getElementById('measuredQuantity').value);

    let res = higitasHandler(corretionTable, homerseklet, mert_alkoholszazalek, minHomerseklet, maxHomerseklet, minAlcoholSzazalek, maxAlcoholSzazalek);
    document.getElementById('fokolas-output').innerHTML = res;
    console.log(res);
}