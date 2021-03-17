import Feature from 'ol/Feature';
import coordinate from'ol/coordinate';


export interface FeatureClickedWithPos {
    feat:Feature,
    coord:coordinate
}

export interface SurveyDataObject {
    quest: string,
    cntrlName: string,
    answerVals: number[]
}