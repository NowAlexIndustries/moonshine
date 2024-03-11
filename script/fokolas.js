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
