import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from '../../../node_modules/rxjs';

/**
 * Generated class for the ChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  message: string = '';
  messages: Observable<{}>;
  //messages: Observable<any>;
  _chatSubscription;

  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    db.object('channels/general').valueChanges().subscribe(data => {
      this.messages.subscribe(data);
      // this.messages = data;
    });
    // console.log(this.messages);
  }


  ionViewDidLoad() {
    console.log(this.afAuth.auth.currentUser.email);
    console.log('ionViewDidLoad ChannelPage');
    console.log(this.messages);
  }

  
  sendMessage() {
    this.db.list('channels/general').push({
      username: this.afAuth.auth.currentUser.email,
      message: this.message
    }).then(() => {
      this.message = '';
    })
  }

}
