import Feature from 'ol/Feature';
import coordinate from 'ol/coordinate';


export interface FeatureClickedWithPos {
    feat: Feature;
    coord: coordinate;
}

export interface SurveyDataObject {
    quest: string;
    dbfield: string;
    cntrlName: string;
    answerVals: number[];
}

export interface MapShareParams {
    center: string;
    zoom: string;
    statIndex: string;
    city: string;
}

export interface ClassRange {
    min: number;
    max: number;
}

export interface SurveyEntity {
    firstName: string;
    lastName: string;
    organisation: string;
    country: string;
    city: string;
    age: string;
    email: string;
    Q1: string;
    Q2: string;
    Q3: string;
    Q4: string;
    Q5: string;
    Q6: string;
    Q7: string;
    Q8: string;
    Q9: string;
}
