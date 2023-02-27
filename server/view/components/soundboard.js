window.customElements.define('soundboard-Ƅ', class extends HTMLElement {

    style;

    #boxSize = 80;

    constructor() {
        super();

        this.div = document.createElement('div');
        this.div.id = "board";
        this.div.innerHTML = `
            <div class="square color1" id="emotional-damage-meme"></div>
            <div class="square color2" id="chupapi-short"></div>
            <div class="square color2" id="mwoah"></div>
            <div class="square color1" id="samson-jaah-1"></div>
            <div class="square color1" id="voorzichtig-op-de-baad"></div>
            <div class="square color2" id="untitled-2_10"></div>
            <div class="square color2" id="het-lijden-van-de-vlaamse-bosdwerg"></div>
            <div class="square color1" id="tf_nemesis"></div>
    	`;

        this.style = document.createElement('style');
        this.style.textContent = `
            :host {
                display: block;
                height: ${this.#boxSize}%;
                aspect-ratio: 1/1;
                border: 5px solid #bbb;
            }
            #board {
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              height: 100%;
            }
            .square {
              width: 50%;
            }
            .color1 {
              background-color: blue;
            }
            .color2 {
              background-color: red;
            }
		`;

        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.appendChild(this.div);
        this._shadowroot.appendChild(this.style);

        const squares = this._shadowroot.querySelectorAll('.square');

        squares.forEach(square => {
            square.addEventListener('click', () => {
                this.sendSoundLocation(square.id);
            });
        });
    }

    sendSoundLocation(sound) {
        this.dispatchEvent(new CustomEvent(this.id, {
            bubbles: true,
            composed: true,
            detail: {
                "link": `https://www.myinstants.com/media/sounds/${sound}.mp3`
            }
        }));
    }

});