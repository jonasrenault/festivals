import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { Moment } from 'moment';
import { FestivalService } from '../festival.service';
import { Festival } from '../festival';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.css']
})
export class FestivalsComponent implements OnInit {

  public festivals: Array<Festival>;
  public filteredFestivals: Array<Festival>;
  public genres: Set<String>;
  private genre: string;
  constructor(private festivalService: FestivalService, private dateAdapter: DateAdapter<Moment>) {
  }

  ngOnInit() {
    this.festivalService.getFestivals().then(festivals => {
      this.festivals = festivals;
      this.filteredFestivals = festivals;
      this.genres = new Set(festivals.map(item => item.genre));
    });
  }

  selectGenre(genre:string) {
    this.genre = genre;
    this.filter();
  }

  public filter(): void {
    this.filteredFestivals = this.festivals.filter((elt: Festival) => !this.genre || elt.genre === this.genre);
  }

}
