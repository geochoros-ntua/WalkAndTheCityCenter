import {Control} from 'ol/control';

export class zoomToWorldControl extends Control {
    button;
    getMap: any;

    constructor() {
        super({});
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = 'W';
        let element = document.createElement('div');
        element.className = 'ol-unselectable ol-control zoomToWorldCntrl';
        element.appendChild(this.button);
        Control.call(this, {
            element: element
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
