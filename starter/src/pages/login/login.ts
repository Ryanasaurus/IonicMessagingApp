import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;

  homePage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alerCtrl: AlertController) {
    this.homePage = HomePage;
  }

  doAlert() {
    let alert = this.alerCtrl.create({
      title: 'Login Success',
      subTitle: 'Welcome to the SWEN325 Starter app ' + this.username,
      buttons: [
        {
          text: 'Continue',
          handler: () => {
            // console.log("continue");
            // this.navCtrl.setRoot(HomePage);
            this.navCtrl.push(HomePage, {
              userData: this.username
            })
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
