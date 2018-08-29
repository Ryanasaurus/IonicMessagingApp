import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SplashPage } from '../pages/splash/splash';
import { ChannelPage } from '../pages/channel/channel';
import { UserPage } from '../pages/user/user';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs-compat';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;

  pages: Array<{title: string, component: any}>;

  channels;
  _chatSubscription;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },      
      { title: 'Register', component: RegisterPage },
      { title: 'Splash', component: SplashPage },
      { title: 'Channel', component: ChannelPage },
      { title: 'User', component: UserPage }
    ];

    this._chatSubscription = db.list('channels/').valueChanges().subscribe(data => {
      this.channels = data;
      console.log(this.channels);
    }),(err) => {
      console.log('error: ', err)
    };

  }

  goToChannel(channel: string) {
    console.log(channel);
    this.nav.setRoot(ChannelPage, {
      channelName: channel
    });
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
    })
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

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.nav.setRoot(HomePage);
  }
}
