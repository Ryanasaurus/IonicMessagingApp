import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ChannelPage } from '../channel/channel';
import { HomePage } from '../home/home';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  
  channels;
  _chatSubscription;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this._chatSubscription = db.list('channels/').valueChanges().subscribe(data => {
      this.channels = data;
      console.log(this.channels);
    }),(err) => {
      console.log('error: ', err)
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  goToChannel(channel: string) {
    console.log(channel);
    this.navCtrl.setRoot(ChannelPage, {
      channelName: channel
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
