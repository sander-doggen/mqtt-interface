window.customElements.define('slider-Ƅ', class extends HTMLElement {
  style;
  constructor() {
    super();

    this.slide = document.createElement('div');
    this.slide.id = 'slide';
    this.slide.innerHTML = `
    <p>Movement speed 1-100:</p>
      <input type="range" min="1" max="100" value="50" id="slideSlider">
      <p>Value: <span id="sliderValue"></span></p>
    `;

    this.style = document.createElement('style');
    this.style.textContent = `
    :host {
    padding: 5px;
    }
    
    .slider {
        -webkit-appearance: none;
        width: 95%;
        height: 25px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
      }
      
      .slider:hover {
        opacity: 1;
      }
      
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        background: #04AA6D;
        cursor: pointer;
      }
      
      .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background: #aa0020;;
        cursor: pointer;
      }
      
    
    
    `;


    this._shadowroot = this.attachShadow({ mode: 'open' });
    this._shadowroot.appendChild(this.slide);
    this._shadowroot.appendChild(this.style);


    this.socket = new WebSocket(`ws://${window.HOST}:${window.PORT}`);

    this.slide.addEventListener('click', this.moveSlider.bind(this));
    document.addEventListener('DOMContentLoaded', () => {
      this.moveSlider();
    });

  }


  moveSlider(event) {
    const value = this._shadowroot.getElementById("slideSlider").value;
    console.log(value);
    const output = this._shadowroot.getElementById("sliderValue");
    output.innerHTML = value;

    this.slide.dispatchEvent(new CustomEvent(this.id, {
      bubbles: true,
      composed: true,
      detail: {
        "value": value
      }
    }));
  }

});
