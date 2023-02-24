// Function name has to be the component's id

let degrees;
let radian;
let force = 100;

function movement2d(data) {
    let x = data.x;
    let y = data.y;

    // No need to calculate an angle and send it if x and y equals 0
    if (x === 0 && y === 0) {
        return null;
    } else {
        radian = Math.atan2(y, x);
        degrees = radToDegrees(radian);
        let message = JSON.stringify({"angle":{"degree":degrees},"force":force});
        return message;
    }
}

// {"message":"hallo","language":"de-DE","pitch":52,"speed":100}
function tts(data) {
    const message = JSON.stringify({"message":data.message,"language":"de-DE","pitch":52,"speed":100});
    return JSON.stringify(data);
}

function radToDegrees(rads) {
    return rads * 180 / Math.PI;
}

module.exports = {
    movement2d,
    tts
};