function interpolate2DArray(data, x, y) {
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

const alc = 'az alkoholszint';
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
