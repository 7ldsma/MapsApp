import { AfterViewInit, Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';


@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  
  @Input() lngLat?: [number, number];
  
  @ViewChild('map') divMap?: ElementRef;

  // public markers: MarkerAndColor[] = [];

  public zoom: number = 12;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(2.164, 41.389);
  
  ngAfterViewInit(): void {
    
    if( !this.divMap?.nativeElement ) throw 'Map no encontrado';
    if ( !this.lngLat ) throw 'lngLat no puede ser null'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      });

  }

}
