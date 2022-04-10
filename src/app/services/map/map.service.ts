import { Injectable } from '@angular/core';

import Map from "@arcgis/core/Map";
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map;
  private view: MapView;

  constructor() { }

  public setMapView(map: Map, view: MapView) {
    this.map = map;
    this.view = view;

    this.map.add(new FeatureLayer({
      title: "מסלולים",
      listMode: "hide-children",
      visible: true,
      id: "routes",
      url: "https://services5.arcgis.com/c2feBOKBaKgy7vWG/arcgis/rest/services/roadauthority/FeatureServer"
    }));
  }

  public getMap(): Map {
    return this.map;
  }

  public getView(): MapView {
    return this.view;
  }
}
