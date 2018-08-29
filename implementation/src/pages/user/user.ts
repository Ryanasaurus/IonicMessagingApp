import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  
  @ViewChild('email') email;
  @ViewChild('oldPassword') oldPassword;
  @ViewChild('newPassword') newPassword;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController) {
  
  }

  updateEmail() {
    if(this.email.value == '') {
      this.alert('Alert', 'Please enter an email');
    } else {
      this.afAuth.auth.currentUser.updateEmail(this.email.value)
      .then(data => {
        this.alert('Success', 'Successfully updated email');
        this.email.value = '';
      })
      .catch(error => {
        this.alert('Alert', error.message);
      });
    }
  }

  updatePassword() {
    if(this.oldPassword.value == '') {
      this.alert('Alert', 'Please enter your old password');
    } else if(this.newPassword.value == '') {
      this.alert('Alert', 'Please enter a new password');
    } else {
      this.afAuth.auth.currentUser.updatePassword(this.newPassword.value)
      .then(data => {
        this.alert('Success', 'Successfully updated password');
      })
      .catch(error => {
        this.alert('Alert', error.message);
      });
    }

  }  

  alert(title: string, message: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
