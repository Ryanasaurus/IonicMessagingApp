import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs-compat';
import { UserPage } from '../user/user';
// import { map } from 'rxjs-compat/operators';

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  @ViewChild(Content) content: Content;

  message: string = '';
  messages;
  _chatSubscription;

  userID;

  channelName: string;
  // channelName: string = 'general';

  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.channelName = this.navParams.get('channelName');
    this.afAuth.auth.currentUser.getIdToken()
    .then(data => {
      this.userID = data;
    });
    this._chatSubscription = db.list('messages/' + this.channelName).valueChanges().subscribe(data => {
      this.messages = data;
    }),(err) => {
      console.log('error: ', err)
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelPage');
  }

  settings() {
    this.navCtrl.push(UserPage);
  }

  scrollDown() {
    this.content.scrollToBottom(0);
  }

  checkLoggedInUser(user: string) {
    return user == this.userID;
  }
  
  sendMessage() {
    console.log(this.messages);
    this.db.list('messages/' + this.channelName).push({
      username: this.afAuth.auth.currentUser.email,
      userID: this.userID,
      message: this.message
    }).then(() => {
      this.message = '';
    })
  }

}
