import { Component, OnInit } from '@angular/core';
import { FestivalService } from '../festival.service';
import { Festival } from '../festival';

@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.css']
})
export class FestivalsComponent implements OnInit {

  public festivals: Array<Festival>;
  constructor(private festivalService: FestivalService) { }

  ngOnInit() {
    this.festivalService.getFestivals().then(festivals => {
      this.festivals = festivals;
    });
  }

}
