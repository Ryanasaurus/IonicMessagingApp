import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { ChannelPage } from '../channel/channel';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

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

  constructor(private db: AngularFireDatabase, 
    private afAuth: AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {
    this._chatSubscription = db.list('channels/').valueChanges().subscribe(data => {
      this.channels = data;
    }),(err) => {
      console.log('error: ', err)
    };
  }

  settings() {
    this.navCtrl.push(UserPage);
  }

  noChannels() {
    return this.channels && this.channels.length==0;
  }

  createChannel(name: string) {
    if(name == '') {
      this.alert('Invalid Name', 'Channels must have a name');
      return;
    }
    this.channels.forEach(channel => {
      if(name == channel.title) {
        this.alert('Invalid Name', 'Channels must have a unique name');
        return;
      }
    });
    this.db.list('channels/').push({
      title: name,
    });
    this.navCtrl.setRoot(ChannelPage, {
      channelName: name
    });
  }
  
  alert(title: string, message: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  showCreateChannelPrompt() {
    if(!this.channels) {
      this.alert('Error', 'Please wait a second and try again');
      return;
    }
    const prompt = this.alertCtrl.create({
      title: 'Create Channel',
      message: 'Enter a name for the new channel',
      inputs: [
        {
          name: 'name',
          placeholder: 'Channel Name'
        },
      ],
      buttons: [
        {
          text: 'Create Channel',
          handler: data => {
            console.log('channel created');
            console.log(data);
            this.createChannel(data.name);
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            console.log('canceled create channel');
          }
        },
      ]
    });
    prompt.present();
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
