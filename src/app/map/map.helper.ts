import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';



export const styleFnCities = (feature:Feature, resolution:number): Style => {
    let retStyle:Style;
    if (resolution<200){
      retStyle = new Style({
        fill: new Fill({
          color: [0, 0, 0, 0]
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
        color: [255, 0, 0, 0]
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



