import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, Input } from '@angular/core';
import { MapService } from '../map.service';
import { Festival } from '../festival';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() festivals: Array<Festival>;
  @ViewChild('container') element: ElementRef;
  private htmlElement: HTMLElement;
  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.mapService.setup(this.htmlElement);
  }

  /**
  * Repopulate the map when @Input changes
  **/
  ngOnChanges(): void {
    this.mapService.showFestivals(this.festivals);
  }

}
