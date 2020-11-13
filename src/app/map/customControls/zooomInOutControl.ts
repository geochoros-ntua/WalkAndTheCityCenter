import {Control} from 'ol/control';

import Map from 'ol/Map';

export class zoomInOutControl extends Control {
    button1:Element;
    button2:Element;
    container:Element;
    getMap: Map;
    constructor() {
        super({});
        this.container = document.createElement('div');

        this.button1 = document.createElement('div');
        this.button1.innerHTML = '<a class="mat-mini-fab mat-primary">'+
        '<i class="material-icons">add</i></a>';

        this.button2 = document.createElement('div');
        this.button2.innerHTML = '<a class="mat-mini-fab mat-primary">'+
        '<i class="material-icons">remove</i></a>';
        
        this.container.appendChild(this.button1);
        this.container.appendChild(this.button2);
        
        
        this.container.className = 'ol-unselectable ol-zoomInOutCntrl';
        Control.call(this, {
            element: this.container
        });
        this.button1.addEventListener('click', () => this.zoomIn());
        this.button2.addEventListener('click', () => this.zoomOut());
    }

    zoomIn() {
        this.getMap().getView().animate({
            center: this.getMap().getView().getCenter(),
            zoom:   this.getMap().getView().getZoom() + 1
        });
    }

    zoomOut() {
        this.getMap().getView().animate({
            center: this.getMap().getView().getCenter(),
            zoom:   this.getMap().getView().getZoom() - 1
        });
    }

    
      

}


