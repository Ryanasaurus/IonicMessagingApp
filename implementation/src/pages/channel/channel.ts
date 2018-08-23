import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs-compat';
// import { map } from 'rxjs-compat/operators';

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  message: string = '';
  messages;
  _chatSubscription;

  channelName: string;

  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.channelName = this.navParams.get('channelName');
    this._chatSubscription = db.list('channels/' + this.channelName).valueChanges().subscribe(data => {
      this.messages = data;
      console.log(this.messages);
    }),(err) => {
      console.log('error: ', err)
    };
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelPage');
  }

  
  sendMessage() {
    console.log(this.messages);
    this.db.list('channels/' + this.channelName).push({
      username: this.afAuth.auth.currentUser.email,
      message: this.message
    }).then(() => {
      this.message = '';
    })
  }

}