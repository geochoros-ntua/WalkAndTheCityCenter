import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {


  teamR = [
    {
      name: "Yorgos N. Photis",
      title: "Prof. Dr.",
      description: "Director, Geography Lab, NTUA",
      email: "yphotis@mail.ntua.gr",
      img: "assets/images/Picture1.png",
      rid: ""
    },
    {
      name: "Alex Bartzokas-Tsiompras",
      title: "",
      description: "Lead Researcher, NTUA",
      email: "abartzok@mail.ntua.gr",
      img: "assets/images/Picture1.png",
      rid: ""
    },
  ]


  teamD = [
    {
      name: "Pavlos Tsagkis",
      title: "",
      description: "GIS & Visualization, NTUA",
      email: "p.tsagkis@gmail.com",
      img: "assets/images/Picture1.png",
      rid: ""
    },
    {
      name: "George Panagiotopoulos",
      title: "Dr.",
      description: "Website & Visualization, NTUA",
      email: "g.panag@metal.ntua.gr",
      img: "assets/images/Picture1.png",
      rid: "https://orcid.org/0000-0002-9100-2081"
    },
  ]

  dataCollection = [
    {name : "Alex Bartzokas - Tsiompras"},
    {name : "Elia Tampouraki"},
    {name : "Eleni Andrikopoulou"},
    {name : "Aglaia Sfakaki"},
    {name : "Eleni Nikolaou"},
    {name : "Konstantinos Stratigis"},
    {name : "Elpida Neofutou"},
    {name : "Stamatis Vrettos"},
    {name : "Elli Krassopoulou"},
    {name : "Marios Stefanidis - Rousettos"},
    {name : "Yiorgos Panteris"},
    {name : "Aikaterini Papamichail"},
    {name : "Petros Varelas"},
    {name : "Orestis Tsekouras"},
    {name : "Nikolaos Stasinos"},
    {name : "Christina Zisopoulou"},
    {name : "Christos Kopadis"},
    {name : "Konstantina Touloupi"},
    {name : "Alexandra Sdrima"},
    {name : "Natalia Temenou"},
    {name : "Aikaterini Zygogianni"},
    {name : "Vasiliki Gatzelia"},
    {name : "Chrysovalanta Alexopoulou"},
    {name : "Elli Evangelou"},
    {name : "Panagiotis Sapoutzoglou"},
    {name : "Pinelopi Michou"},
    {name : "Ioanna Minetou"},
    {name : "Antonia Tzanetou"},
    {name : "Christina Anastasopoulou"},
    {name : "Dimitra Papaioannidou"},
    {name : "Evi Moschou"},
    {name : "Maria Plota"},
    {name : "Emmanouil Martinos"},
    {name : "Loukas Strongilis"},
    {name : "Marianna Nassi"},
    {name : "Anna Ziakou"},
    {name : "Metaxia Vlachaki"},
    {name : "Danai Stylou"},
    {name : "Iro Papadopoulou"},
    {name : "Zoe Paparsenou"},
    {name : "Vasiliki Christodoulou"},
    {name : "Efstathios Bakouros"},
    {name : "Konstantinos Vergos"},
    {name : "Aikaterini Panagiotopoulou"},
    {name : "Anastasios Papadopoulos"},
    {name : "Ioannis Katsafados"},
    {name : "Panagiotis Kompogiannis"},
    {name : "Afroditi Mpardosa"},
    {name : "Yiannis Paraskevopoulos"}
  ]

  breakpoint;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 960) ? 2 : 4;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 960) ? 2 : 4;
  }

}
