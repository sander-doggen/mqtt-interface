let component_id;

let boxSize = 400;
let knobSize = 150;

const knob = document.createElement('div');
knob.id = 'knob';

const style = document.createElement('style');
style.textContent = `
:host {
    display: block;
    width: ${boxSize}px;
    height: ${boxSize}px;
    border: 5px solid #004eff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #knob {
    width: ${knobSize}px;
    height: ${knobSize}px;
    border-radius: 50%;
    background-color: #b5b5b5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.1s;
    transition-timing-function: ease-out;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
 }
`;

let knobCenter = null;
let mouse_x = 0;
let mouse_y = 0;

let grab_delta_x = 0;
let grab_delta_y = 0;

let mov_x = 0;
let mov_y = 0;

let coords = { x: 0, y: 0 };

let isDragging = false;


window.customElements.define('joystick-Ƅ', class extends HTMLElement {
    constructor() {
        super();
        component_id = this.id;
        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.appendChild(knob);
        this._shadowroot.appendChild(style);

        this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);

        document.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);

        document.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', stopDrag);

        document.addEventListener('DOMContentLoaded', () => {
            knobCenter = getKnobCenter();
        });
    }

    connectedCallback() {
        this.socket.addEventListener('open', event => {
            console.log(`opening socket for ${component_id} ...`);
            this.socket.send(JSON.stringify({ "payload": "input-connected", "id": component_id }));
        });
    }

});

function moveJoystick(x, y, element) {
    element.style.transform = `translate3d(${x - knobSize / 2}px, ${y - knobSize / 2}px, 0)`;
    element.dispatchEvent(new CustomEvent(component_id, {
        bubbles: true,
        composed: true,
        detail: {
            "x": mov_x,
            "y": mov_y
        }
    }));
}

function getPosition(event) {
    mouse_x = event.clientX || event.touches[0].clientX;
    mouse_y = event.clientY || event.touches[0].clientY;
}

function startDrag(event) {
    event.preventDefault();
    knobCenter = getKnobCenter();
    getPosition(event);

    coords = toLocalCoords({ x: mouse_x, y: mouse_y });

    if (insideBounds(coords.x, coords.y, 50)) {
        isDragging = true;

        grab_delta_x = coords.x;
        grab_delta_y = coords.y;

        mouse_x = 0;
        mouse_y = 0;
    }
}

function drag(event) {
    if (isDragging) {
        event.preventDefault();
        getPosition(event);

        coords = toLocalCoords({ x: mouse_x, y: mouse_y });

        mov_x = coords.x - grab_delta_x;
        mov_y = coords.y - grab_delta_y;

        if (insideBounds(mov_x, mov_y, 200)) moveJoystick(mov_x, -mov_y, knob);
    }
}

function stopDrag(event) {
    isDragging = false;
    mov_x = 0;
    mov_y = 0;
    moveJoystick(mov_x, mov_y, knob);
}

function toLocalCoords(coords) {
    return {
        x: coords.x - knobCenter.x,
        y: knobCenter.y - coords.y
    }
}

function toGlobalCoords(coords) {
    return {
        x: coords.x + knobCenter.x,
        y: knobCenter.y - coords.y
    }
}

function getKnobCenter() {
    const rect = knob.getBoundingClientRect();
    const center = {
        x: rect.left + (rect.width / 2),
        y: rect.top + (rect.height / 2)
    };
    return center;
}

function insideBounds(x, y, r) {
    if (x > r || x < -r) return false;
    if (y > r || y < -r) return false;
    return true;
}

