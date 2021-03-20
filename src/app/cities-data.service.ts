import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class City {
  name: string;
  image: string;
  chart_image: string;
  flipped_image: boolean = false;
  state: string = 'default';
  order_number: number;
  selected_variable: number;
  segments: number;
  area: number;
  max_segments: string;
  land_use_non_commercial: number;
  land_use_commercial: number;
  parks_no: number;
  parks_one: number;
  parks_two: number;
  transit_no: number;
  transit_one: number;
  transit_two: number;
  public_no: number;
  public_yes: number;
  street_none: number;
  street_some: number;
  street_plenty: number;
  buildings_no: number;
  buildings_yes: number;
  graffitti_yes: number;
  graffitti_no: number;
  bike_no: number;
  bike_paint: number;
  bike_protected: number;
  sidewalk_absent: number;
  sidewalk_present: number;
  sidewalk_well_no: number;
  sidewalk_well_yes: number;
  sidewalk_buffer_no: number;
  sidewalk_buffer_yes: number;
  sidewalk_shade_no: number;
  sidewalk_shade_some: number;
  sidewalk_shade_plenty: number;
  sidewalk_width_small: number;
  sidewalk_width_large: number;
  traffic_four: number;
  traffic_two: number;
  traffic_one: number;
  crossing_pedestrain_no: number;
  crossing_pedestrain_yes: number;
  crossing_curb_no: number;
  crossing_curb_yes: number;
  crossing_curb_yes_two: number;
  crossing_walk_no: number;
  crossing_walk_yes: number;
}

@Injectable({
  providedIn: 'root'
})
export class CitiesDataService {

  csvUrl = 'assets/data/cities.csv';
  cities = [];

  private citiesData = new Subject<any>();
  citiesData$ = this.citiesData.asObservable();

  headers = [
    {
      name: "None (Alphabetical order)",
      value: "alphabetical"
    },
    {
      name: "Land Use: Non-Commercial/Non-Entertainment Activities",
      value: "land_use_non_commercial"
    },
    {
      name: "Land Use: Mainly Commercial/Entertainment Activities",
      value: "land_use_commercial"
    },
    {
      name: "Parks/Plazas: No",
      value: "parks_no"
    },
    {
      name: "Parks/Plazas: 1 Access Point",
      value: "parks_one"
    },
    {
      name: "Parks/Plazas: 2+ Access Points",
      value: "parks_two"
    },
    {
      name: "Transit Stops: No",
      value: "transit_no"
    },
    {
      name: "Transit Stops: 1",
      value: "transit_one"
    },
    {
      name: "Transit Stops: 2+",
      value: "transit_two"
    },
    {
      name: "Public Seating: No",
      value: "public_no"
    },
    {
      name: "Public Seating: Yes",
      value: "public_yes"
    },
    {
      name: "Street Lights: None",
      value: "street_none"
    },
    {
      name: "Street Lights: Some",
      value: "street_some"
    },
    {
      name: "Street Lights: Plenty",
      value: "street_plenty"
    },
    {
      name: "Buildings Well-maintained: No",
      value: "buildings_no"
    },
    {
      name: "Buildings Well-maintained: Yes",
      value: "buildings_yes"
    },
    {
      name: "Graffitti: Yes",
      value: "graffitti_yes"
    },
    {
      name: "Graffitti: No",
      value: "graffitti_no"
    },
    {
      name: "Bike Lane: No",
      value: "bike_no"
    },
    {
      name: "Bike Lane: Painted Line",
      value: "bike_paint"
    },
    {
      name: "Bike Land: Protected from traffic",
      value: "bike_protected"
    },
    {
      name: "Sidewalk: Absent",
      value: "sidewalk_absent"
    },
    {
      name: "Sidewalk: Present",
      value: "sidewalk_present"
    },
    {
      name: "Sidewalk Well-maintained: No or No Sidewalk Present",
      value: "sidewalk_well_no"
    },
    {
      name: "Sidewalk Well-maintained: Yes",
      value: "sidewalk_well_yes"
    },
    {
      name: "Sidewalk Buffers: No or No Sidewalk Present",
      value: "sidewalk_buffer_no"
    },
    {
      name: "Sidewalk Buffers: Yes or Pedestrian Street",
      value: "sidewalk_buffer_yes"
    },
    {
      name: "Sidewalk Shading/Overhead Coverage: 0% - 25% (length) or No Sidewalk Present",
      value: "sidewalk_shade_no"
    },
    {
      name: "Sidewalk Shading/Overhead Coverage: 26% - 75% (length)",
      value: "sidewalk_shade_some"
    },
    {
      name: "Sidewalk Shading/Overhead Coverage: 76% - 100% (length)",
      value: "sidewalk_shade_plenty"
    },
    {
      name: "Sidewalk Width: Less than 2 m or No Sidewalk Present",
      value: "sidewalk_width_small"
    },
    {
      name: "Sidewalk Width: Greater than 2 m",
      value: "sidewalk_width_large"
    },
    {
      name: "Traffic: More than 4 lanes",
      value: "traffic_four"
    },
    {
      name: "Traffic: 2 - 3 lanes",
      value: "traffic_two"
    },
    {
      name: "Traffic: Single lane or pedestrian street",
      value: "traffic_one"
    },
    {
      name: "Crossing - Pedestrian Walk Signal: No",
      value: "crossing_pedestrain_no"
    },
    {
      name: "Crossing - Pedestrian Walk Signal: Yes",
      value: "crossing_pedestrain_yes"
    },
    {
      name: "Crossing - Curb ramp(s): No",
      value: "crossing_curb_no"
    },
    {
      name: "Crossing - Curb ramp(s): Yes, At one curb only",
      value: "crossing_curb_yes"
    },
    {
      name: "Crossing - Curb ramp(s): Yes, at both pre- and post-crossing curbs",
      value: "crossing_curb_yes_two"
    },
    {
      name: "Crossing - Pedestrian Crosswalk: No",
      value: "crossing_walk_no"
    },
    {
      name: "Crossing - Pedestrian Crosswalk: Yes",
      value: "crossing_walk_yes"
    },
  ];


  variables = [
    {
      name: "Land Use: Non-Commercial/Non-Entertainment Activities",
      value: "land_use_non_commercial"
    },
    {
      name: "Land Use: Mainly Commercial/Entertainment Activities",
      value: "land_use_commercial"
    },
    {
      name: "Parks/Plazas: No",
      value: "parks_no"
    },
    {
      name: "Parks/Plazas: 1 Access Point",
      value: "parks_one"
    },
    {
      name: "Parks/Plazas: 2+ Access Points",
      value: "parks_two"
    },
    {
      name: "Transit Stops: No",
      value: "transit_no"
    },
    {
      name: "Transit Stops: 1",
      value: "transit_one"
    },
    {
      name: "Transit Stops: 2+",
      value: "transit_two"
    },
    {
      name: "Public Seating: No",
      value: "public_no"
    },
    {
      name: "Public Seating: Yes",
      value: "public_yes"
    },
    {
      name: "Street Lights: None",
      value: "street_none"
    },
    {
      name: "Street Lights: Some",
      value: "street_some"
    },
    {
      name: "Street Lights: Plenty",
      value: "street_plenty"
    },
    {
      name: "Buildings Well-maintained: No",
      value: "buildings_no"
    },
    {
      name: "Buildings Well-maintained: Yes",
      value: "buildings_yes"
    },
    {
      name: "Graffitti: Yes",
      value: "graffitti_yes"
    },
    {
      name: "Graffitti: No",
      value: "graffitti_no"
    },
    {
      name: "Bike Lane: No",
      value: "bike_no"
    },
    {
      name: "Bike Lane: Painted Line",
      value: "bike_paint"
    },
    {
      name: "Bike Land: Protected from traffic",
      value: "bike_protected"
    },
    {
      name: "Sidewalk: Absent",
      value: "sidewalk_absent"
    },
    {
      name: "Sidewalk: Present",
      value: "sidewalk_present"
    },
    {
      name: "Sidewalk Well-maintained: No or No Sidewalk Present",
      value: "sidewalk_well_no"
    },
    {
      name: "Sidewalk Well-maintained: Yes",
      value: "sidewalk_well_yes"
    },
    {
      name: "Sidewalk Buffers: No or No Sidewalk Present",
      value: "sidewalk_buffer_no"
    },
    {
      name: "Sidewalk Buffers: Yes or Pedestrian Street",
      value: "sidewalk_buffer_yes"
    },
    {
      name: "Sidewalk Shading/Overhead Coverage: 0% - 25% (length) or No Sidewalk Present",
      value: "sidewalk_shade_no"
    },
    {
      name: "Sidewalk Shading/Overhead Coverage: 26% - 75% (length)",
      value: "sidewalk_shade_some"
    },
    {
      name: "Sidewalk Shading/Overhead Coverage: 76% - 100% (length)",
      value: "sidewalk_shade_plenty"
    },
    {
      name: "Sidewalk Width: Less than 2 m or No Sidewalk Present",
      value: "sidewalk_width_small"
    },
    {
      name: "Sidewalk Width: Greater than 2 m",
      value: "sidewalk_width_large"
    },
    {
      name: "Traffic: More than 4 lanes",
      value: "traffic_four"
    },
    {
      name: "Traffic: 2 - 3 lanes",
      value: "traffic_two"
    },
    {
      name: "Traffic: Single lane or pedestrian street",
      value: "traffic_one"
    },
    {
      name: "Crossing - Pedestrian Walk Signal: No",
      value: "crossing_pedestrain_no"
    },
    {
      name: "Crossing - Pedestrian Walk Signal: Yes",
      value: "crossing_pedestrain_yes"
    },
    {
      name: "Crossing - Curb ramp(s): No",
      value: "crossing_curb_no"
    },
    {
      name: "Crossing - Curb ramp(s): Yes, At one curb only",
      value: "crossing_curb_yes"
    },
    {
      name: "Crossing - Curb ramp(s): Yes, at both pre- and post-crossing curbs",
      value: "crossing_curb_yes_two"
    },
    {
      name: "Crossing - Pedestrian Crosswalk: No",
      value: "crossing_walk_no"
    },
    {
      name: "Crossing - Pedestrian Crosswalk: Yes",
      value: "crossing_walk_yes"
    },
  ];

  constructor(private http: HttpClient) {

    this.http.get(this.csvUrl, { responseType: 'text' })
    .subscribe(
      (data) => {

        let csvRecordsArray = (<string>data).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);


        this.cities = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        this.citiesData.next(this.cities);

      },
      error => {
        console.log(error)
      });
   }

   getHeaders() {
     return this.headers;
   }

   getCities() {
    return this.cities;
  }

  getVariables() {
    return this.variables;
  }


   getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let tempCities = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(';');
      if (curruntRecord.length === headerLength) {
        let cityItem: City = new City();
        cityItem.order_number = Number(curruntRecord[0].trim());
        cityItem.name = curruntRecord[1].trim();
        cityItem.image = "assets/data/cities/" + curruntRecord[1].trim() + ".png";
        cityItem.chart_image = "assets/data/Pie_charts/" + curruntRecord[1].trim() + ".png";
        cityItem.segments = Number(curruntRecord[2].trim());
        cityItem.area = Number(curruntRecord[3].trim());
        cityItem.max_segments = curruntRecord[4].trim();
        cityItem.land_use_non_commercial = Number(curruntRecord[5].trim());
        cityItem.land_use_commercial = Number(curruntRecord[6].trim());
        cityItem.parks_no = Number(curruntRecord[7].trim());
        cityItem.parks_one = Number(curruntRecord[8].trim());
        cityItem.parks_two = Number(curruntRecord[9].trim());
        cityItem.transit_no = Number(curruntRecord[10].trim());
        cityItem.transit_one = Number(curruntRecord[11].trim());
        cityItem.transit_two = Number(curruntRecord[12].trim());
        cityItem.public_no = Number(curruntRecord[13].trim());
        cityItem.public_yes = Number(curruntRecord[14].trim());
        cityItem.street_none = Number(curruntRecord[15].trim());
        cityItem.street_some = Number(curruntRecord[16].trim());
        cityItem.street_plenty = Number(curruntRecord[17].trim());
        cityItem.buildings_no = Number(curruntRecord[18].trim());
        cityItem.buildings_yes = Number(curruntRecord[19].trim());
        cityItem.graffitti_yes = Number(curruntRecord[20].trim());
        cityItem.graffitti_no = Number(curruntRecord[21].trim());
        cityItem.bike_no = Number(curruntRecord[22].trim());
        cityItem.bike_paint = Number(curruntRecord[23].trim());
        cityItem.bike_protected = Number(curruntRecord[24].trim());
        cityItem.sidewalk_absent = Number(curruntRecord[25].trim());
        cityItem.sidewalk_present = Number(curruntRecord[26].trim());
        cityItem.sidewalk_well_no = Number(curruntRecord[27].trim());
        cityItem.sidewalk_well_yes = Number(curruntRecord[28].trim());
        cityItem.sidewalk_buffer_no = Number(curruntRecord[29].trim());
        cityItem.sidewalk_buffer_yes = Number(curruntRecord[30].trim());
        cityItem.sidewalk_shade_no = Number(curruntRecord[31].trim());
        cityItem.sidewalk_shade_some = Number(curruntRecord[32].trim());
        cityItem.sidewalk_shade_plenty = Number(curruntRecord[33].trim());
        cityItem.sidewalk_width_small = Number(curruntRecord[34].trim());
        cityItem.sidewalk_width_large = Number(curruntRecord[35].trim());
        cityItem.traffic_four = Number(curruntRecord[36].trim());
        cityItem.traffic_two = Number(curruntRecord[37].trim());
        cityItem.traffic_one = Number(curruntRecord[38].trim());
        cityItem.crossing_pedestrain_no = Number(curruntRecord[39].trim());
        cityItem.crossing_pedestrain_yes = Number(curruntRecord[40].trim());
        cityItem.crossing_curb_no = Number(curruntRecord[41].trim());
        cityItem.crossing_curb_yes = Number(curruntRecord[42].trim());
        cityItem.crossing_curb_yes_two = Number(curruntRecord[43].trim());
        cityItem.crossing_walk_no = Number(curruntRecord[44].trim());
        cityItem.crossing_walk_yes = Number(curruntRecord[45].trim());

        tempCities.push(cityItem);

      }
    }
    return tempCities;
  }


  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(';');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  
}
