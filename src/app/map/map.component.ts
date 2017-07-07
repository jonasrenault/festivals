import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { MapService } from '../map.service';
import { Festival } from '../festival';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() festivals: Array<Festival>;
  @Output() onFestivalSelected = new EventEmitter<Festival>();
  @ViewChild('container') element: ElementRef;
  private htmlElement: HTMLElement;
  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.mapService.setup(this.htmlElement, (id: number) => this.festivalCallback(id));
  }

  /**
  * Repopulate the map when @Input changes
  **/
  ngOnChanges(): void {
    this.mapService.showFestivals(this.festivals);
  }

  festivalCallback(festivalId: number): void {
    const festival = this.festivals.filter(elt => elt.id === festivalId);
    if (festival.length > 0) {
      this.onFestivalSelected.emit(festival[0]);
    }
    console.log(festivalId);
  }

}
