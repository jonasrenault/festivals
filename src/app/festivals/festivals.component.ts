import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { FestivalService } from '../festival.service';
import { Festival } from '../festival';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.scss']
})
export class FestivalsComponent implements OnInit {

  public festivals: Array<Festival>;
  public filteredFestivals: Array<Festival>;
  public genres: Set<String>;
  public dateFilter: Moment;
  public festival: Festival;
  private genre: string;
  constructor(private festivalService: FestivalService) {
    this.dateFilter = moment();
  }

  ngOnInit() {
    this.festivalService.getFestivals().then(festivals => {
      this.festivals = festivals;
      this.genres = new Set(festivals.map(item => item.genre));
      this.filter();
    });
  }

  selectGenre(genre:string) {
    this.genre = genre;
    this.filter();
  }

  selectFestival(festival:Festival): void {
    this.festival = festival;
  }

  dateChange(newValue: Moment):void {
    this.dateFilter = newValue;
    this.filter();
  }

  public filter(): void {
    this.filteredFestivals = this.festivals.filter((elt: Festival) => {
      return this.isGenre(elt) && this.isOnDate(elt);
    });
  }

  private isGenre(elt: Festival): boolean {
    return !this.genre || elt.genre === this.genre;
  }

  private isOnDate(elt:Festival): boolean {
    return !this.dateFilter || (elt.start.isBefore(this.dateFilter) && elt.end.isAfter(this.dateFilter));
  }

}
