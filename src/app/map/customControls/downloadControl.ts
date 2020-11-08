import {Control} from 'ol/control';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';


let selIndex = 'Score';
export const setSelIndexDownCntlr =(idx:string):void => {
    selIndex = idx;
}

export class downloadControl extends Control {
    legendDiv;
    button;
    getMap: Map;
    constructor() {
        super({});
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = 'D';
        let element = document.createElement('div');
        element.className = 'ol-unselectable ol-downloadCntrl ol-control';
        element.appendChild(this.button);
        Control.call(this, {
            element: element
        });
        this.button.addEventListener('click', () => this.click());
    }

    click() {
        const walkLyr = this.getMap().getLayers().getArray().find(
            elem => elem.get('title') === 'WALK'
            )
            if (walkLyr) {
                const feats = walkLyr.getSource().getFeatures();
                if (feats.length>0){
                let parsedFeats = [];
                feats.forEach(feat => {
                    const inFeat = new Feature();
                    inFeat.setGeometry(feat.getGeometry());
                    inFeat.set(selIndex,feat.get(selIndex));
                    parsedFeats.push(inFeat);
                  });
                  const format = new GeoJSON({
                    defaultDataProjection:'EPSG:3857',
                    featureProjection:'EPSG:3857',
                    geometryName:'geometry'
                  });
                  const data =  format.writeFeatures(parsedFeats);
                  const sJson = JSON.stringify(data);
                  let element = document.createElement('a');
                  element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(JSON.parse(sJson)));
                  element.setAttribute('download', "walkhub-data.geojson");
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click(); // simulate click
                  document.body.removeChild(element);
                }
            }
    }

}


