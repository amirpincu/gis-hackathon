import { Component } from '@angular/core';

import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from '@arcgis/core/views/MapView';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hazard-display';

  constructor() {
  }

  ngOnInit() {

    esriConfig.apiKey = "AAPK3f4ddac3215b48719ab5bcdd1bcee174W-tRNmiA8_4fQYcKraekgDPubO4J1ld-smyOMyVKuePXCGC552_uu4-KZOKW_PQI";
    const map = new Map({
      basemap: "arcgis-streets" // Basemap layer
    });

    const view = new MapView({
      map: map,
      center: [34.789770779256685, 32.08687166775767],
      zoom: 12, // scale: 72223.819286
      container: "viewDiv",
      constraints: {
        snapToZoom: false
      }
    });

    view.on("click", (event) => {
      console.log(view.zoom);
      console.log(view.toMap(event));
    })
  }
}
