import { Component, OnInit } from '@angular/core';
import { Bike } from '../app.types';
import { BikeService } from '../bike.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  bikes: Array<Bike>;
  rentedBike: Bike;
  user: { username: string };

  constructor(private api: BikeService) { }

  ngOnInit(): void {
    // this.api.getLoggedInUser().subscribe(res => {
    //   this.user = res.data;
    //   console.log('user :', this.user); // ! remove
    // });

    this.api.getBikes().subscribe(res => {
      this.bikes = res.data;
    });

    this.api.getCurrentlyRentedBike().subscribe(res => {
      this.rentedBike = res.data;
      console.log('my bike :', this.rentedBike); // ! remove
    });
  }
}
