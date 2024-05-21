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

  public zoom: number = 15;
  
  ngAfterViewInit(): void {
    
    if( !this.divMap?.nativeElement ) throw 'Map no encontrado';
    if ( !this.lngLat ) throw 'lngLat no puede ser null'

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive: false,
      });


      new Marker()
        .setLngLat( this.lngLat )
        .addTo( map )

  }

}
