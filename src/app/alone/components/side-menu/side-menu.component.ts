import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapsRoutingModule } from '../../../maps/maps-routing.module';


interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, MapsRoutingModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    {route: '/maps/fullscreen', name: 'Full Screen'},
    {route: '/maps/zoom-range', name: 'Zoom Range'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Properties'},
    {route: '/maps/alone', name: 'Alone Page'},

  ]

}
