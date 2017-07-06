import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Festival } from './festival';

// see https://github.com/Leaflet/Leaflet/issues/4968
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

@Injectable()
export class MapService {

  private htmlElement: HTMLElement;
  private map: L.Map;
  private config: Object;
  constructor() {
    this.config = {
      center: [46.6, 2.1],
      zoom: 6,
      minZoom: 1
      // maxZoom: 9,
      // scrollWheelZoom: true
    };
  }

  public setup(htmlElement: HTMLElement): void {
    this.htmlElement = htmlElement;
    this.buildMap();
  }

  private buildMap(): void {
    this.map = L.map(this.htmlElement, this.config);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', <L.TileLayerOptions>{ subdomains: "abcd", detectRetina: true, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'}).addTo(this.map);
  }

  public showFestivals(festivals: Array<Festival>): void {
    if (festivals) {
      festivals.forEach(elt => {
        L.marker([elt.lat, elt.lon]).addTo(this.map);
      });
    }
  }

}
