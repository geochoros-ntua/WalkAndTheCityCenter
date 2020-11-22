import Feature from 'ol/Feature';
import coordinate from'ol/coordinate';


export interface featureClickedWithPos {
    feat:Feature,
    coord:coordinate
}