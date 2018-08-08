import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SplashPage } from '../splash/splash';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('user') user;

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(data => {
        console.log('got data ', data);
        this.alert('Registered!');
        this.navCtrl.setRoot(SplashPage);
      })
      .catch(error => {
        console.log(error);
        this.alert(error.message);
      })
  }

}
