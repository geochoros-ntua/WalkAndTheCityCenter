import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import geostats from 'geostats/lib/geostats'
import chroma from 'chroma-js'


let selIndex = 'Score';
let classSeries;
let classColors;

export const setSelIndex =(idx:string):void => {
  selIndex = idx;
}


export const styleFnCities = (feature:Feature, resolution:number): Style => {
    let retStyle:Style;
    if (resolution<200){
      retStyle = new Style({
        fill: new Fill({
          color: [255, 0, 0, 0]
        }),
        stroke: new Stroke({
          color: [255, 255, 0, 1],
          width: 4
        })
      })
    } else {
      retStyle = new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({color: 'green'}),
          stroke: new Stroke({
            color: [0,0,255], 
            width: 2
          })
        }),
        geometry: (myfeature) => {
          var retPoint;
          if (myfeature.getGeometry().getType() === 'MultiPolygon') {
            retPoint = getMaxPoly(myfeature.getGeometry().getPolygons()).getInteriorPoint();
          } else if (myfeature.getGeometry().getType() === 'Polygon') {
            retPoint = myfeature.getGeometry().getInteriorPoint();
          }
          return retPoint;
        },
      })
    }
    return retStyle;
}

export const highlightStyle = (feature:Feature, resolution:number): Style => {
  let retStyle:Style;
  if (resolution<200){
    retStyle = new Style({
      fill: new Fill({
        color: [255, 0, 0, 0.5]
      }),
      stroke: new Stroke({
        color: [0, 255, 0, 1],
        width: 6
      })
    })
  } else {
    retStyle = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({color: 'black'}),
        stroke: new Stroke({
          color: [0,0,255], 
          width: 4
        })
      }),
      text: new Text({
        font: '14px Calibri,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff', width: 2
        }),
        text: feature.get('City')
      }),
      geometry: (myfeature) => {
        var retPoint;
        if (myfeature.getGeometry().getType() === 'MultiPolygon') {
          retPoint = getMaxPoly(myfeature.getGeometry().getPolygons()).getInteriorPoint();
        } else if (myfeature.getGeometry().getType() === 'Polygon') {
          retPoint = myfeature.getGeometry().getInteriorPoint();
        }
        return retPoint;
      },
    })
  }
  return retStyle;
};


export const getAndSetClassesFromData = (data:any, resetStyle?:boolean) => {
  let retObj = {};
  if (data.length>0){
    console.log('data',data)
    data = data.map(vals => {
      return Number(vals.toFixed(4));
    });
    let serie = new geostats(data);
    serie.getClassQuantile(10);
    let colors = chroma.scale([[253, 231, 37, 1],[30, 158, 137, 1], [68, 1, 84, 1]]).colors(10);
    serie.setColors(colors);
    classSeries = serie;
    classColors = colors;
    document.getElementById('legend').innerHTML = serie.getHtmlLegend(null, "Walkability. Index:"+selIndex,1);
    retObj= {
      'ser':serie, 
      'cols':colors
    };
  }
  return retObj;
}

export const styleFnWalkGrids = (feature:Feature, resolution:number): Style => {
  const currVal = parseFloat(feature.get(selIndex));
  const bounds = classSeries.bounds;
  let numRanges = new Array();
  for (let i = 0; i < bounds.length-1; i++) { 
  numRanges.push({
      min: parseFloat(bounds[i]),
      max: parseFloat(bounds[i+1])
    });  
  }  
  var classIndex = verifyClassFromVal(numRanges, currVal);
  var polyStyleConfig = {
    stroke: new Stroke({
      color: [255, 255, 0, 0],
      width: 0
    }),
    fill: new Fill({
      color: classColors[classIndex]
    }),
  };
return new Style(polyStyleConfig);
}

export const verifyClassFromVal = (rangevals, val) => {
  let retIndex = -1;
  let valRound = Number(val.toFixed(4))
  for (let i = 0; i < rangevals.length; i++) {
    if (valRound >= rangevals[i].min && valRound <= rangevals[i].max) {
      retIndex = i;
    } 
  }
  return retIndex;
}

/**
 *    get the maximum polygon out of the supllied  array of polygons
 */
export const getMaxPoly = (polys:Polygon[]) => {
  let polyObj = [];
  for (let b = 0; b < polys.length; b++) {
    polyObj.push({
      poly: polys[b],
      area: polys[b].getArea()
    });
  }
  polyObj.sort((a, b) => a.area - b.area);
  return polyObj[polyObj.length - 1].poly;
}



