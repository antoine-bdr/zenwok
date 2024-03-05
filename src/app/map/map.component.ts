import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  latitude: number = 50.589483168056596;
  longitude: number = 3.087899186630139;
  zoom: number = 13;
}
