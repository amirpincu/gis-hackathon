import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { MapService } from '../map/map.service';

import esriRequest from "@arcgis/core/request";

@Injectable({
  providedIn: 'root'
})
export class ShapefileReaderService {

  constructor(
    private mapService: MapService,
    private httpClient: HttpClient
  ) { }

  public async readFile() {

    let data;

    this.httpClient.get('assets/roadauthority.zip', { responseType: "blob" }).subscribe((response) => {
      console.log(response);
      const dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      const binData = response.arrayBuffer()
      .then((buffer) => {
        // const data = new Blob(buffer, { type: response.type.toString() });
        console.log(buffer);
        this.requestFeaturesFromFile(buffer);
      })
      .catch((error) => {
        console.log(error);
      })
    });
  }


  // rEADING

  private requestFeaturesFromFile(data) {

  const portalUrl = "https://www.arcgis.com";
  const view = this.mapService.getView();

  const params = {
    name: name,
    targetSR: view.spatialReference,
    maxRecordCount: 1000,
    enforceInputFileSizeLimit: true,
    enforceOutputJsonSizeLimit: true
  };

  // generalize features to 10 meters for better performance
  // params.generalize = true;
  // params.maxAllowableOffset = 10;
  // params.reducePrecision = true;
  // params.numberOfDigitsAfterDecimal = 0;

  const myContent = {
    // filetype: "shapefile",
    publishParameters: JSON.stringify(params),
    // f: "json"
  };

  // use the REST generate operation to generate a feature collection from the zipped shapefile
  esriRequest(portalUrl + "/sharing/rest/content/features/generate", {
    query: myContent,
    body: data,
    responseType: "json"
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
}
}
