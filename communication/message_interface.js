// {"angle":{"degree":180,"radian":3.1415926536},"force":100}

let degrees;
let radian;
let force = 100;

function movement2d(data) {
    let x = data.x;
    let y = data.y;

    if (x === 0 && y === 0) {
        return null;
    } else {
        radian = Math.atan2(y, x);
        degrees = radToDegrees(radian);
        let message = JSON.stringify({"angle":{"degree":degrees},"force":force});
        return message;
    }
}

function radToDegrees(rads) {
    return rads * 180 / Math.PI;
}

module.exports = {
    movement2d
};