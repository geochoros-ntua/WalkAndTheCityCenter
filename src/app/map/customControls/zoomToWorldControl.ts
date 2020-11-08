import {Control} from 'ol/control';
import Map from 'ol/Map';

export class zoomToWorldControl extends Control {
    button;
    getMap: Map;

    constructor() {
        super({});
        this.button = document.createElement('div');
        this.button.innerHTML = '<a class="mat-mini-fab mat-primary">'+
        '<i class="material-icons">public</i></a>';
        this.button.className = 'ol-unselectable zoomToWorldCntrl';
        
        Control.call(this, {
            element: this.button
        });

        this.button.addEventListener('click', () => {
            this.click()
        });
    }
    click() {
        const cityLyr = this.getMap().getLayers().getArray().filter(
            elem => elem.get('title') === 'CITY_BNDS'
            )
            
        this.getMap().getView().fit(cityLyr[0].getSource().getExtent(),{
            padding:[100,100,100,100],
             size:this.getMap().getSize(),
             duration:2000
           });
    
        }
    }
