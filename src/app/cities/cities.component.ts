import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class City {
  name: string;
  image: string;
  order_number : number;
  selected_variable : number;
  segments: number;
  area: number;
  blocks: number;
  records: number;
  street: number;
  street_per: number;
  crossing: number;
  crossing_per: number;
  only_street: number;
  only_street_per: number;
  no_data: number;
  no_data_per: number;
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})


export class CitiesComponent implements OnInit {

  csvUrl = 'assets/data/cities.csv';

  cities = [];
  headers = [
    {
      name: "Total Length of Segments (km)",
      value: "segments"
    },
    {
      name: "Total Area (sq.km)",
      value: "area"
    },
    {
      name: "Total Number of Building Blocks",
      value: "blocks"
    },
    {
      name: "Total Number of GIS Records",
      value: "records"
    },
    {
      name: "Street & Crossing Segments",
      value: "street"
    },
    {
      name: "Street & Crossing Segments (%)",
      value: "street_per"
    },
    {
      name: "Only Crossing Segments",
      value: "crossing"
    },
    {
      name: "Only Crossing Segments (%)",
      value: "crossing_per"
    },
    {
      name: "Only Street Segments",
      value: "only_street"
    },
    {
      name: "Only Street Segments (%)",
      value: "only_street_per"
    },
    {
      name: "No Data Segments",
      value: "no_data"
    },
    {
      name: "No Data Segments (%)",
      value: "no_data_per"
    },
  ];


  constructor(private http: HttpClient) {


    this.http.get(this.csvUrl, { responseType: 'text' })
      .subscribe(
        (data) => {
          // console.log(data)
          let csvRecordsArray = (<string>data).split(/\r\n|\n/);

          let headersRow = this.getHeaderArray(csvRecordsArray);

          console.log(headersRow)

          this.cities = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

          // console.log(this.cities)
        },
        error => {
          console.log(error)
        });



  }

  ngOnInit(): void {
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let tempCities = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(';');
      if (curruntRecord.length === headerLength) {
        let cityItem: City = new City();
        cityItem.name = curruntRecord[0].trim();
        cityItem.image = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + curruntRecord[0].trim();
        cityItem.segments = Number(curruntRecord[1].trim());
        cityItem.selected_variable = Number(curruntRecord[1].trim());
        cityItem.area = Number(curruntRecord[2].trim());
        cityItem.blocks = Number(curruntRecord[3].trim());
        cityItem.records = Number(curruntRecord[4].trim());

        cityItem.street = Number(curruntRecord[5].trim());
        cityItem.street_per = Number(curruntRecord[6].trim());

        cityItem.crossing = Number(curruntRecord[7].trim());
        cityItem.crossing_per = Number(curruntRecord[8].trim());

        cityItem.only_street = Number(curruntRecord[9].trim());
        cityItem.only_street_per = Number(curruntRecord[10].trim());

        cityItem.no_data = Number(curruntRecord[11].trim());
        cityItem.no_data_per = Number(curruntRecord[12].trim());

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

  sortCities(variable: any) {
    console.log(variable)
    this.cities.sort((a: any, b: any) => {
      return b[variable.value] - a[variable.value];
    });

    for (let index = 0; index < this.cities.length; index++) {
      this.cities[index].order_number = index + 1;
      this.cities[index].selected_variable = this.cities[index][variable.value];
    }
  }


}
