export class Festival {
  id: number;
  name: string;
  genre: string;
  city: string;
  lon: number;
  lat: number;
  start: Date;
  end: Date;
  text: string;
  website: string;
  phone: string;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.name = jsonObject.name;
    this.genre = jsonObject.genre;
    this.city = jsonObject.city;
    this.lon = jsonObject.lon;
    this.lat = jsonObject.lat;
    this.start = jsonObject.start;
    this.end = jsonObject.end;
    this.text = jsonObject.text;
    this.website = jsonObject.website;
    this.phone = jsonObject.phone;
  }
}
