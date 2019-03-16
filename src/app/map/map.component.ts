import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bike } from '../app.types';
import { BikeService } from '../bike.service';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  bikes: Array<Bike>;
  rentedBike: Bike;
  userId: string;
  bikesSub: Subscription;

  constructor(
    private bikeService: BikeService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.bikeService.getBikes();

    this.bikesSub = this.bikeService.getBikesUpdatedListener().subscribe(value => {
      this.bikes = value.bikes;
    });

    this.userId = this.authService.getLoggedInUserId();
  }

  rentBike(bike: Bike): void {
    this.bikeService.rentBike(bike._id).subscribe(v => console.log(v));
  }

  returnBike(bike: Bike, lat: number, long: number): void {
    this.bikeService.returnBike(bike._id, lat, long).subscribe(v => console.log(v));
  }

  ngOnDestroy(): void {
    this.bikesSub.unsubscribe();
  }
}
