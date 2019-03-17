import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Bike } from '../shared/app.types';
import { BikeService } from '../shared/bike.service';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  bikes: Array<Bike>;
  userId: string;
  bikes$: Subscription;
  isLoggedIn: boolean;

  screenHeight: number;
  screenWidth: number;
  mapCenterLat: number;
  mapCenterLong: number;

  constructor(
    private bikeService: BikeService,
    private authService: AuthService,
  ) {
    // to set map size
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.bikeService.getBikes();

    this.bikes$ = this.bikeService.getBikesUpdatedListener().subscribe(value => {
      this.bikes = value.bikes;

      // calculate map center (average of lats and longs)
      let latSum = 0;
      let longSum = 0;
      this.bikes.forEach(it => {
        latSum += it.latitude;
        longSum += it.longitude;
      });
      this.mapCenterLat = latSum / this.bikes.length;
      this.mapCenterLong = longSum / this.bikes.length;
    });

    this.userId = this.authService.getLoggedInUserId();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  rentBike(bike: Bike): void {
    this.bikeService.rentBike(bike._id).subscribe(value => {
      bike.rented = true;
      bike.rentedBy = this.userId;
    });
  }

  // For now, we are reusing the lat long from bike
  // in actual case, new lat long will be received
  returnBike(bike: Bike, lat: number, long: number): void {
    this.bikeService.returnBike(bike._id, lat, long).subscribe(value => {
      bike.rented = false;
      bike.rentedBy = null;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.bikes$.unsubscribe();
  }
}
