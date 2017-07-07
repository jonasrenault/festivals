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

const ColorIcon = L.Icon.extend({
  options: {
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
});

const blackIcon= new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-black.png')}), blueIcon = new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-blue.png')}), greenIcon = new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-green.png')}), greyIcon = new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-grey.png')}), redIcon = new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-red.png')}), orangeIcon = new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-orange.png')}), violetIcon = new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-violet.png')}), yellowIcon = new ColorIcon({iconUrl: require('assets/markers/marker-icon-2x-yellow.png')});

const switcher = {
  Musique: blueIcon,
  Autres: greenIcon,
  Danse: greyIcon,
  Littérature: orangeIcon,
  'Théâtre / Arts de la rue / Cirque': redIcon,
  'Cinéma': violetIcon,
  'Photo / Art contemporain': yellowIcon,
  'BD': blackIcon
};

@Injectable()
export class MapService {

  private htmlElement: HTMLElement;
  private map: L.Map;
  private config: Object;
  private layerGroups = {
    Musique: L.layerGroup(),
    Autres: L.layerGroup(),
    Danse: L.layerGroup(),
    Littérature: L.layerGroup(),
    'Théâtre / Arts de la rue / Cirque': L.layerGroup(),
    'Cinéma': L.layerGroup(),
    'Photo / Art contemporain': L.layerGroup(),
    'BD': L.layerGroup()
  };
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
    this.addLayerGroups();
  }

  public showFestivals(festivals: Array<Festival>): void {
    if (festivals) {
      this.clearLayerGroups();
      festivals.forEach(elt => {
        const marker = this.createFestivalMarker(elt);
        this.layerGroups[elt.genre].addLayer(marker);
        // marker.addTo(this.map);
      });
    }
  }

  public clearLayerGroups(): void {
    for (let group in this.layerGroups) {
      if (this.layerGroups.hasOwnProperty(group)) {
        this.layerGroups[group].clearLayers();
      }
    }
  }

  public addLayerGroups(): void {
    for (let group in this.layerGroups) {
      if (this.layerGroups.hasOwnProperty(group)) {
        this.layerGroups[group].addTo(this.map);
      }
    }
  }

  private createFestivalMarker(festival: Festival): L.Marker {
    return L.marker([festival.lat, festival.lon], {icon: switcher[festival.genre]})
  }

}
