import { Component, OnInit } from '@angular/core';
// import citiesData from '../../assets/geodata/cities.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  team = [
    {
      name: "Yorgos N. Photis",
      title: "Prof. Dr.",
      description: "Director, Geography Lab, NTUA",
      email: "yphotis@mail.ntua.gr"
    },
    {
      name: "Alex Bartzokas-Tsiompras",
      title: "",
      description: "Lead Researcher, NTUA",
      email: "abartzok@mail.ntua.gr"
    },
    {
      name: "Pavlos Tsagkis",
      title: "",
      description: "GIS & Visualization, NTUA",
      email: "p.tsagkis@gmail.com"
    },
    {
      name: "George Panagiotopoulos",
      title: "Dr.",
      description: "Website & Visualization, NTUA",
      email: "g.panag@metal.ntua.gr"
    },
  ]

  pubs = [
    {
      name: "Bartzokas-Tsiompras, A., Photis, Y., Tsagkis, P., & Panagiotopoulos, G. (2021 – Article in press). Microscale walkability indicators for fifty-nine European downtown neighbourhoods: An open-access tabular dataset and geospatial web-based platform. Data in Brief Journal.",
      doi: ""
    },
    {
      name: "Bartzokas-Tsiompras, A., & Photis, Y. N. (2021). Microscale walkability indicators for fifty-nine European downtown neighbourhoods [Data set]. Mendeley.",
      doi: "https://doi.org/10.17632/PVTWCJS365.1"
    },
    {
      name: "Bartzokas-Tsiompras A., Paraskevopoulos Y., Sfakaki A., Photis Y.N. (2021) Addressing Street Network Accessibility Inequities for Wheelchair Users in Fifteen European City Centers. In: Nathanail E.G., Adamos G., Karakikes I. (eds) Advances in Mobility-as-a-Service Systems. CSUM 2020. Advances in Intelligent Systems and Computing, vol 1278. Springer, Cham.",
      doi: "https://doi.org/10.1007/978-3-030-61075-3_98"
    },
    {
      name: "Bartzokas-Tsiompras, A., Tampouraki, E. M., & Photis, Y. N. (2020). Is walkability equally distributed among downtowners? Evaluating the pedestrian streetscapes of eight European capitals using a micro-scale audit approach. International Journal of Transport Development and Integration, 4(1), 75–92.",
      doi: "https://doi.org/10.2495/TDI-V4-N1-75-92"
    },
  ]

  constructor() {

  }

  ngOnInit(): void {

  }

  scrollDown() {
    window.scrollBy(0, window.innerHeight);
  }



}
