import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userData: string;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.userData = navParams.data.userData;
  }

}
