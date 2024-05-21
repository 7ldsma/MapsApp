import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';


interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color: string;
  lngLat: number[];
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 12;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(2.164, 41.389);



  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
	  container: this.divMap.nativeElement, // container ID
	  style: 'mapbox://styles/mapbox/streets-v12', // style URL
	  center: this.currentLngLat, // starting position [lng, lat]
	  zoom: this.zoom, // starting zoom
    });


    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Alvaro Ledesma'


    // const marker = new Marker({

    //   element: markerHtml,
    //   color: 'green'
    // })
    //   .setLngLat( this.currentLngLat )
    //   .addTo( this.map );

    
  }
  

  createMarker() {

    if ( !this.map ) return;
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random()*16|0).toString(16));

    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color);
  }


  
  addMarker( lngLat: LngLat, color: string) {

    if ( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat)
      .addTo( this.map )

      this.markers.push({
        color,
        marker,
      });  //agrego cada marker que creo en el array de markers

      this.saveToLocalStorage();

      marker.on('dragend',() => this.saveToLocalStorage() );

  }


  deleteMarker( index: number ){
    this.markers[ index ].marker.remove();
    this.markers.splice( index, 1 );
  }


  flyTo( marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })
  }


// para hacer persistentes los marcadores los siguientes metodos

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {

      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ))  

  }


  readFromLocalStorage() {
    
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';

    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color, lngLat }) => {

      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );   // esto tambien podria escribirse como new LngLat( lgnLat[0], lngLat[1] )
      
      this.addMarker( coords, color);
    });

  }




  zoomIn(){
    this.map?.zoomIn;
  }

  zoomOut(){
    this.map?.zoomOut;
  }

  zoomChanged( value: string ){

    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom ); 
  }

}
