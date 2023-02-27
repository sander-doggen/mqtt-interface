window.customElements.define('soundboard-Ƅ', class extends HTMLElement {

    style;

    #boxSize = 80;

    constructor() {
        super();

        this.div = document.createElement('div');
        this.div.id = "board";
        this.div.innerHTML = `
            <div class="square blue" id="emotional-damage-meme"></div>
            <div class="square white" id="chupapi-short"></div>
            <div class="square white" id="chupapi"></div>
            <div class="square blue" id="mwoah"></div>
            <div class="square blue" id="samson_jaah"></div>
            <div class="square white" id="voorzichtig_baan"></div>
            <div class="square white" id="untitled"></div>
            <div class="square blue"></div>
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
            .blue {
              background-color: blue;
            }
            .white {
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