import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'k-bike';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  markers: any;

  ngOnInit(): void {
    this.markers = [
      [51.879966, 8.726909],
      [51.879969, 8.726907],
      [51.87995, 8.72697],
      [51.87994, 8.7263],
      [51.87994, 8.7263]
    ];
  }
}
