import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Festival } from './festival';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FestivalService {

  private festivalsUrl = 'assets/festivals.json';  // URL to web api

  constructor(private http: Http) { }

  getFestivals(): Promise<Festival[]> {
    return this.http.get(this.festivalsUrl)
    .toPromise()
    .then(response => response.json().map((elt, idx) => {
      const points = elt.lonlat.split(',').map(elt => parseFloat(elt));
      return new Festival({
        id: idx,
        name: elt.name,
        genre: elt.genre.trim(),
        city: elt.city,
        lon: isNaN(points[0]) ? 0 : points[0],
        lat: isNaN(points[1]) ? 0 : points[1],
        start: moment(elt.start, ['DD/MM/YYYY']),
        endDate: moment(elt.end, ['DD/MM/YYYY']),
        text: elt.text,
        website: (elt.website.indexOf('://') < 0 ? 'http://' : '') + elt.website,
        phone: elt.phone
      });
    }))
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
