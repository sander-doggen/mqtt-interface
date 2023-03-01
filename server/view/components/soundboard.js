window.customElements.define('soundboard-Ƅ', class extends HTMLElement {

    style;

    #boxSize = 90;

    constructor() {
        super();

        this.div = document.createElement('div');
        this.div.id = "board";
        this.div.innerHTML = `
            <div class="square color1" id="emotional-damage-meme"><a href="#" class="btn blue">Emotional damage</a></div>
            <div class="square color2" id="chupapi-short"> <a href="#" class="btn red">Chupapi</a></div>
            <div class="square color2" id="mwoah"><a href="#" class="btn green">Mwoah</a></div>
            <div class="square color1" id="samson-jaah-1"> <a href="#" class="btn purple">samson</a></div>
            <div class="square color1" id="voorzichtig-op-de-baad"> <a href="#" class="btn yellow">voorzichtig</a></div>
            <div class="square color2" id="untitled-2_10"><a href="#" class="btn orange">untitled</a></div>
            <div class="square color2" id="het-lijden-van-de-vlaamse-bosdwerg"><a href="#" class="btn navy">vlaamse bosdwerg</a></div>
            <div class="square color1" id="tf_nemesis"> <a href="#" class="btn pink">nemesis</a></div>
    	`;

        this.style = document.createElement('style');
        this.style.textContent = `
            :host {
                box-sizing: border-box;
                position: absolute;
                aspect-ratio: 1/1;
                border: 5px solid #bbb;
                border-radius: 5px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: ${this.#boxSize}%;
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
              
              display: flex; 
              align-items: center; 
              justify-content: center; 
              text-align: center;
              color:white;
            }
            .color2 {
              
              display: flex; 
              align-items: center; 
              justify-content: center; 
              text-align: center;
              color:white;
            }
            .btn {
                border-radius: 5px;
                padding: 5px 10px;
                font-size: 18px;
                text-decoration: none;
                margin-left:10%;
                color: #fff;
                position: relative;
                display: inline-block;
              }
              
              .btn:active {
                transform: translate(0px, 5px);
                -webkit-transform: translate(0px, 5px);
                box-shadow: 0px 1px 0px 0px;
              }
              
              .blue {
                background-color: #55acee;
                box-shadow: 0px 5px 0px 0px #3C93D5;
              }
              
              .blue:hover {
                background-color: #6FC6FF;
              }
              .red {
                background-color: #e74c3c;
                box-shadow: 0px 5px 0px 0px #CE3323;
              }
              
              .red:hover {
                background-color: #FF6656;
              }
              .green {
                background-color: #2ecc71;
                box-shadow: 0px 5px 0px 0px #15B358;
              }
              
              .green:hover {
                background-color: #48E68B;
              }
              .navy {
                background-color: #e3b5ab;
                
                box-shadow: 0px 5px 0px 0px #caa198;
              }
              
              .navy:hover {
                background-color: #fdcabf;
              }
              .pink {
                background-color: #b8afd5;
                
                box-shadow: 0px 5px 0px 0px #938caa;
              }
              
              .pink:hover {
                background-color: #ddd5ef;
              }

              

                .purple {
                    background-color: #9b59b6;
                    box-shadow: 0px 5px 0px 0px #82409D;
                }
                
                .purple:hover {
                    background-color: #B573D0;
                }
                
                .orange {
                    background-color: #e67e22;
                    box-shadow: 0px 5px 0px 0px #CD6509;
                }
                
                .orange:hover {
                    background-color: #FF983C;
                }
                
                .yellow {
                    background-color: #f1c40f;
                    box-shadow: 0px 5px 0px 0px #D8AB00;
                }
                
                .yellow:hover {
                    background-color: #FFDE29;
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