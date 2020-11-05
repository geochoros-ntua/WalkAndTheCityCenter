import {Control} from 'ol/control';

export class legendControl extends Control {
    legendDiv;
    button;
    constructor() {
        super({});
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = 'L';
        let element = document.createElement('div');
        element.className = 'ol-unselectable ol-control ol-legendCntrl';
        //element.appendChild(this.button);
        this.legendDiv = document.createElement('div');
        this.legendDiv.id = 'legend';
        this.legendDiv.className = 'legendDivHide';
        this.legendDiv.innerHTML = '';
        
        element.appendChild(this.legendDiv);
        element.appendChild(this.button);
        Control.call(this, {
            element: element
        });
        this.button.addEventListener('click', () => this.click());
    }

    click() {
        console.log('click');
        if (this.legendDiv.className === 'legendDivHide'){
        this.button.innerHTML = '<span>«</span>';
        this.legendDiv.className = 'legendDivShow';
        }
        else {
        this.button.innerHTML = 'L';
        this.legendDiv.className = 'legendDivHide';
        }
    }

}