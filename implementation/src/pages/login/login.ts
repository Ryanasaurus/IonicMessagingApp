import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { SplashPage } from '../splash/splash';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  signInUser() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(data=> {
        console.log(this.afAuth.auth.currentUser);
        this.alert('Success!');
        this.navCtrl.setRoot(SplashPage);
      })
      .catch(error => {
        console.log(error);
        this.alert(error.message);
      })
  }

}
