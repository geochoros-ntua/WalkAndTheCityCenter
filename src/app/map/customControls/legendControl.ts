import {Control} from 'ol/control';
import Map from 'ol/Map';

export class legendControl extends Control {
    legendDiv;
    button;
    getMap: Map;
    constructor() {
        super({});
        this.button = document.createElement('div');
        this.button.innerHTML = '<a class="mat-mini-fab mat-primary">'+
        '<i class="material-icons">art_track</i></a>';
        let element = document.createElement('div');
        element.className = 'ol-unselectable ol-legendCntrl';
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
        const res = this.getMap().getView().getResolution();
        if (res <= 50 && this.legendDiv.className === 'legendDivHide') {
            this.button.innerHTML = '<a class="mat-mini-fab mat-primary">'+
            '<i class="material-icons">close</i></a>';
            this.legendDiv.className = 'legendDivShow';
        } else {
            this.button.innerHTML = '<a class="mat-mini-fab mat-button-base mat-primary">'+
            '<i class="material-icons">art_track</i></a>';
            this.legendDiv.className = 'legendDivHide';
        }

    }

}