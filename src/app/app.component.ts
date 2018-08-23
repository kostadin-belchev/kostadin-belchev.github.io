import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import * as admin from 'firebase-admin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBbe9JAvHrWBLE7Wfa93aQBvHGnPSrNiso",
      authDomain: "ng-e-shop.firebaseapp.com",
      databaseURL: 'https://ng-e-shop.firebaseio.com'
    })
    // admin.initializeApp({
    //   credential: admin.credential.applicationDefault(),
    //   databaseURL: 'https://ng-e-shop.firebaseio.com'
    // });
  }
}
